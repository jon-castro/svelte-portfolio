<script>
  import router from "page";
  import routes from "./routes";

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

  body {
    padding: 0;
    background-color: #212121;
  }
  h1 {
    @apply text-3xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  a {
    @apply text-blue-600;
  }

  @tailwind components;
  @tailwind utilities;
</style>

<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
</nav>

<main>
  <svelte:component this={page} {params} />
</main>
