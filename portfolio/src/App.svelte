<script>
  import router from "page";
  import routes from "./routes";

  import { isDarkMode } from "./stores.js";

  let page;
  let params;

  routes.forEach(route => {
    router(
      route.path,
      //Context and initialization
      (ctx, next) => {
        params = ctx.params;
        next();
      },
      () => (page = route.component)
    );
  });

  router.start();
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  header {
    @apply bg-secondary-dark;
  }
  h1 {
    @apply text-text-dark;
    @apply text-3xl;
  }
  h2 {
    @apply text-text-dark;
    @apply text-xl;
  }
  h3 {
    @apply text-text-dark;
    @apply text-lg;
  }
  a {
    text-decoration: none;
    @apply text-text-dark;
    @apply text-lg;
  }
</style>

<main class={$isDarkMode ? 'bg-background-dark' : 'bg-background-light'}>
  <svelte:component this={page} {params} />
</main>
