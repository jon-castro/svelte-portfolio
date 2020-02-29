import Home from "./pages/Home.svelte";
import ProjectDetail from "./pages/ProjectDetail.svelte";
import ArticleDetail from "./pages/ArticleDetail.svelte";

//Original Examples -> Remove when done.
import Blog from "./pages/Blog.svelte";
import SingleBlog from "./pages/SingleBlog.svelte";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/project/:id",
    component: ProjectDetail
  },
  {
    path: "/article/:id",
    component: ArticleDetail
  },
  {
    path: "*",
    component: Home
  },
  // Example endpoints -> Remove when done.
  {
    path: "/blog",
    component: Blog
  },
  {
    path: "/blog/:id",
    component: SingleBlog
  }
];
