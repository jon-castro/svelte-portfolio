<script>
  export let params;

  import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";

  import projects from "../data/projects.js";

  let data = projects[params.id];
</script>

<style>
  .icon {
    @apply text-white;
    width: 25px;
    height: 25px;
    padding-top: 5%;
  }
</style>

<a href="/">
  <button
    class="bg-button-dark text-white font-bold py-2 px-4 m-6 border-b-4
    border-blue-700 rounded">
    <div class="icon inline-block">
      <FaArrowLeft />
    </div>
    Back to Project List
  </button>
</a>

<h1 class="text-center text-white">{data.title}</h1>
<p class="px-3 pt-5">{data.body}</p>
