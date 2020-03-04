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
    @apply bg-black;
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
    @apply text-lg;
  }
  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <svelte:component this={page} {params} />
</main>
