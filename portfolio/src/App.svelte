<script>
  import router from "page";

  // Routes
  import Home from "./routes/Home.svelte";
  import Blog from "./routes/Blog.svelte";
  import SingleBlog from "./routes/SingleBlog.svelte";

  let page;
  let params;

  router("/", () => (page = Home));
  router("/blog", () => (page = Blog));
  router(
    "/blog/:id",
    //Before we set the component
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    //Set the component
    () => (page = SingleBlog)
  );

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
