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
    @apply text-text-buttons;
    @apply text-lg;
  }
  a:hover {
    @apply bg-button-dark;
  }
  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <svelte:component this={page} {params} />
</main>
