import Home from "./pages/Home.svelte";
import ProjectDetail from "./pages/ProjectDetail.svelte";
import ArticleDetail from "./pages/ArticleDetail.svelte";

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
  }
];
