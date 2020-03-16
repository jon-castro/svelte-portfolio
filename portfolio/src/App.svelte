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
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-background-dark;
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
  /* a:hover {
    text-decoration: none;
    @apply bg-button-dark;
    @apply text-text-buttons;
  } */
</style>

<main>
  <svelte:component this={page} {params} />
</main>
