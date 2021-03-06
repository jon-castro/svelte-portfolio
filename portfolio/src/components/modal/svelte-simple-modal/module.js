import { setContext } from 'svelte';

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if (typeof $$scope.dirty === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let stylesheet;
let active = 0;
let current_rules = {};
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    if (!current_rules[name]) {
        if (!stylesheet) {
            const style = element('style');
            document.head.appendChild(style);
            stylesheet = style.sheet;
        }
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    node.style.animation = (node.style.animation || '')
        .split(', ')
        .filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    )
        .join(', ');
    if (name && !--active)
        clear_rules();
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        let i = stylesheet.cssRules.length;
        while (i--)
            stylesheet.deleteRule(i);
        current_rules = {};
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(children(options.target));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set() {
        // overridden by instance, if it has props
    }
}

function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}

/* src/Modal.svelte generated by Svelte v3.18.2 */

function add_css() {
	var style = element("style");
	style.id = "svelte-fnsfcv-style";
	style.textContent = ".svelte-fnsfcv{box-sizing:border-box}.bg.svelte-fnsfcv{position:fixed;z-index:1000;display:flex;flex-direction:column;justify-content:center;width:100vw;height:100vh;background:rgba(0, 0, 0, 0.66)}.window-wrap.svelte-fnsfcv{position:relative;margin:2rem;max-height:100%}.window.svelte-fnsfcv{position:relative;width:40rem;max-width:100%;max-height:100%;margin:2rem auto;color:black;border-radius:0.5rem;background:white}.content.svelte-fnsfcv{position:relative;padding:1rem;max-height:calc(100vh - 4rem);overflow:auto}.close.svelte-fnsfcv{display:block;box-sizing:border-box;position:absolute;z-index:1000;top:1rem;right:1rem;margin:0;padding:0;width:1.5rem;height:1.5rem;border:0;color:black;border-radius:1.5rem;background:white;box-shadow:0 0 0 1px black;transition:transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),\n                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);-webkit-appearance:none}.close.svelte-fnsfcv:before,.close.svelte-fnsfcv:after{content:'';display:block;box-sizing:border-box;position:absolute;top:50%;width:1rem;height:1px;background:black;transform-origin:center;transition:height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),\n                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)}.close.svelte-fnsfcv:before{-webkit-transform:translate(0, -50%) rotate(45deg);-moz-transform:translate(0, -50%) rotate(45deg);transform:translate(0, -50%) rotate(45deg);left:0.25rem}.close.svelte-fnsfcv:after{-webkit-transform:translate(0, -50%) rotate(-45deg);-moz-transform:translate(0, -50%) rotate(-45deg);transform:translate(0, -50%) rotate(-45deg);left:0.25rem}.close.svelte-fnsfcv:hover{background:black}.close.svelte-fnsfcv:hover:before,.close.svelte-fnsfcv:hover:after{height:2px;background:white}.close.svelte-fnsfcv:focus{border-color:#3399ff;box-shadow:0 0 0 2px #3399ff}.close.svelte-fnsfcv:active{transform:scale(0.9)}.close.svelte-fnsfcv:hover,.close.svelte-fnsfcv:focus,.close.svelte-fnsfcv:active{outline:none}";
	append(document.head, style);
}

// (201:2) {#if Component}
function create_if_block(ctx) {
	let div3;
	let div2;
	let div1;
	let t;
	let div0;
	let div1_transition;
	let div3_transition;
	let current;
	let dispose;
	let if_block = /*state*/ ctx[0].closeButton && create_if_block_1(ctx);
	const component_spread_levels = [/*props*/ ctx[2]];
	let component_props = {};

	for (let i = 0; i < component_spread_levels.length; i += 1) {
		component_props = assign(component_props, component_spread_levels[i]);
	}

	const component = new /*Component*/ ctx[1]({ props: component_props });

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			if (if_block) if_block.c();
			t = space();
			div0 = element("div");
			create_component(component.$$.fragment);
			attr(div0, "class", "content svelte-fnsfcv");
			attr(div0, "style", /*cssContent*/ ctx[7]);
			attr(div1, "class", "window svelte-fnsfcv");
			attr(div1, "style", /*cssWindow*/ ctx[6]);
			attr(div2, "class", "window-wrap svelte-fnsfcv");
			attr(div3, "class", "bg svelte-fnsfcv");
			attr(div3, "style", /*cssBg*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div1);
			if (if_block) if_block.m(div1, null);
			append(div1, t);
			append(div1, div0);
			mount_component(component, div0, null);
			/*div2_binding*/ ctx[31](div2);
			/*div3_binding*/ ctx[32](div3);
			current = true;
			dispose = listen(div3, "click", /*handleOuterClick*/ ctx[12]);
		},
		p(ctx, dirty) {
			if (/*state*/ ctx[0].closeButton) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div1, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			const component_changes = (dirty[0] & /*props*/ 4)
			? get_spread_update(component_spread_levels, [get_spread_object(/*props*/ ctx[2])])
			: {};

			component.$set(component_changes);

			if (!current || dirty[0] & /*cssContent*/ 128) {
				attr(div0, "style", /*cssContent*/ ctx[7]);
			}

			if (!current || dirty[0] & /*cssWindow*/ 64) {
				attr(div1, "style", /*cssWindow*/ ctx[6]);
			}

			if (!current || dirty[0] & /*cssBg*/ 32) {
				attr(div3, "style", /*cssBg*/ ctx[5]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(component.$$.fragment, local);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[9], /*state*/ ctx[0].transitionWindowProps, true);
				div1_transition.run(1);
			});

			add_render_callback(() => {
				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[8], /*state*/ ctx[0].transitionBgProps, true);
				div3_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(component.$$.fragment, local);
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[9], /*state*/ ctx[0].transitionWindowProps, false);
			div1_transition.run(0);
			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[8], /*state*/ ctx[0].transitionBgProps, false);
			div3_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			if (if_block) if_block.d();
			destroy_component(component);
			if (detaching && div1_transition) div1_transition.end();
			/*div2_binding*/ ctx[31](null);
			/*div3_binding*/ ctx[32](null);
			if (detaching && div3_transition) div3_transition.end();
			dispose();
		}
	};
}

// (215:10) {#if state.closeButton}
function create_if_block_1(ctx) {
	let button;
	let dispose;

	return {
		c() {
			button = element("button");
			attr(button, "class", "close svelte-fnsfcv");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			dispose = listen(button, "click", /*close*/ ctx[10]);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(button);
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let t;
	let current;
	let dispose;
	let if_block = /*Component*/ ctx[1] && create_if_block(ctx);
	const default_slot_template = /*$$slots*/ ctx[30].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[29], null);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			t = space();
			if (default_slot) default_slot.c();
			attr(div, "class", "svelte-fnsfcv");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append(div, t);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
			dispose = listen(window, "keyup", /*handleKeyup*/ ctx[11]);
		},
		p(ctx, dirty) {
			if (/*Component*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
					transition_in(if_block, 1);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 536870912) {
				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[29], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[29], dirty, null));
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			if (default_slot) default_slot.d(detaching);
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { key = "simple-modal" } = $$props;
	let { closeButton = true } = $$props;
	let { closeOnEsc = true } = $$props;
	let { closeOnOuterClick = true } = $$props;
	let { styleBg = { top: 0, left: 0 } } = $$props;
	let { styleWindow = {} } = $$props;
	let { styleContent = {} } = $$props;
	let { setContext: setContext$1 = setContext } = $$props;
	let { transitionBg = fade } = $$props;
	let { transitionBgProps = { duration: 250 } } = $$props;
	let { transitionWindow = transitionBg } = $$props;
	let { transitionWindowProps = transitionBgProps } = $$props;

	const defaultState = {
		closeButton,
		closeOnEsc,
		closeOnOuterClick,
		styleBg,
		styleWindow,
		styleContent,
		transitionBg,
		transitionBgProps,
		transitionWindow,
		transitionWindowProps
	};

	let state = { ...defaultState };
	let Component = null;
	let props = null;
	let background;
	let wrap;
	const camelCaseToDash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
	const toCssString = props => Object.keys(props).reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, "");

	const open = (NewComponent, newProps = {}, options = {}) => {
		$$invalidate(1, Component = NewComponent);
		$$invalidate(2, props = newProps);
		$$invalidate(0, state = { ...defaultState, ...options });
	};

	const close = () => {
		$$invalidate(1, Component = null);
		$$invalidate(2, props = null);
	};

	const handleKeyup = ({ key }) => {
		if (state.closeOnEsc && Component && key === "Escape") {
			event.preventDefault();
			close();
		}
	};

	const handleOuterClick = event => {
		if (state.closeOnOuterClick && (event.target === background || event.target === wrap)) {
			event.preventDefault();
			close();
		}
	};

	setContext$1(key, { open, close });
	let { $$slots = {}, $$scope } = $$props;

	function div2_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			$$invalidate(4, wrap = $$value);
		});
	}

	function div3_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			$$invalidate(3, background = $$value);
		});
	}

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(13, key = $$props.key);
		if ("closeButton" in $$props) $$invalidate(14, closeButton = $$props.closeButton);
		if ("closeOnEsc" in $$props) $$invalidate(15, closeOnEsc = $$props.closeOnEsc);
		if ("closeOnOuterClick" in $$props) $$invalidate(16, closeOnOuterClick = $$props.closeOnOuterClick);
		if ("styleBg" in $$props) $$invalidate(17, styleBg = $$props.styleBg);
		if ("styleWindow" in $$props) $$invalidate(18, styleWindow = $$props.styleWindow);
		if ("styleContent" in $$props) $$invalidate(19, styleContent = $$props.styleContent);
		if ("setContext" in $$props) $$invalidate(20, setContext$1 = $$props.setContext);
		if ("transitionBg" in $$props) $$invalidate(21, transitionBg = $$props.transitionBg);
		if ("transitionBgProps" in $$props) $$invalidate(22, transitionBgProps = $$props.transitionBgProps);
		if ("transitionWindow" in $$props) $$invalidate(23, transitionWindow = $$props.transitionWindow);
		if ("transitionWindowProps" in $$props) $$invalidate(24, transitionWindowProps = $$props.transitionWindowProps);
		if ("$$scope" in $$props) $$invalidate(29, $$scope = $$props.$$scope);
	};

	let cssBg;
	let cssWindow;
	let cssContent;
	let currentTransitionBg;
	let currentTransitionWindow;

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*state*/ 1) {
			 $$invalidate(5, cssBg = toCssString(state.styleBg));
		}

		if ($$self.$$.dirty[0] & /*state*/ 1) {
			 $$invalidate(6, cssWindow = toCssString(state.styleWindow));
		}

		if ($$self.$$.dirty[0] & /*state*/ 1) {
			 $$invalidate(7, cssContent = toCssString(state.styleContent));
		}

		if ($$self.$$.dirty[0] & /*state*/ 1) {
			 $$invalidate(8, currentTransitionBg = state.transitionBg);
		}

		if ($$self.$$.dirty[0] & /*state*/ 1) {
			 $$invalidate(9, currentTransitionWindow = state.transitionWindow);
		}
	};

	return [
		state,
		Component,
		props,
		background,
		wrap,
		cssBg,
		cssWindow,
		cssContent,
		currentTransitionBg,
		currentTransitionWindow,
		close,
		handleKeyup,
		handleOuterClick,
		key,
		closeButton,
		closeOnEsc,
		closeOnOuterClick,
		styleBg,
		styleWindow,
		styleContent,
		setContext$1,
		transitionBg,
		transitionBgProps,
		transitionWindow,
		transitionWindowProps,
		defaultState,
		camelCaseToDash,
		toCssString,
		open,
		$$scope,
		$$slots,
		div2_binding,
		div3_binding
	];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-fnsfcv-style")) add_css();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				key: 13,
				closeButton: 14,
				closeOnEsc: 15,
				closeOnOuterClick: 16,
				styleBg: 17,
				styleWindow: 18,
				styleContent: 19,
				setContext: 20,
				transitionBg: 21,
				transitionBgProps: 22,
				transitionWindow: 23,
				transitionWindowProps: 24
			},
			[-1, -1]
		);
	}
}

export default Modal;
