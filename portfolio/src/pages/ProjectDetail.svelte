<script>
  import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";

  export let params;

  import projects from "../data/projects.js";

  let data = projects[params.id];
</script>

<style>
  body {
    @apply border-indigo-900;
  }
  .icon {
    color: antiquewhite;
    width: 25px;
    height: 25px;
  }
</style>

<a href="/">
  <button
    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 m-6
    border-b-4 border-blue-700 hover:border-blue-500 rounded">
    <div class="icon inline-block">
      <FaArrowLeft />
    </div>
    Back to Project List
  </button>
</a>

<h1 class="text-center text-light-tan">{data.title}</h1>
<p class="px-3 pt-5">{data.body}</p>
