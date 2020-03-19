<script>
  export let params;

  import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";

  import { isDarkMode } from "../stores.js";

  import DarkModeButton from "../components/DarkModeButton.svelte";
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

<div>
  <a href="/">
    <button
      class="{$isDarkMode ? 'bg-section-dark' : 'bg-section-light'}
      text-text-buttons font-bold py-2 px-4 m-6 border-b-4 border-indigo-700
      rounded">
      <div class="icon inline-block">
        <FaArrowLeft />
      </div>
      Back to Projects List
    </button>
  </a>
  <div class="justify-center">
    <DarkModeButton />
  </div>
  <h1
    class="text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.title}
  </h1>
  <p
    class="px-5 py-5 opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.body}
  </p>
  <div class="">
    <img class="" src={data.image} alt={data.title} />
  </div>
</div>
