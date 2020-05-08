<script>
  export let params;

  import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";
  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
  import FaLaptopCode from "svelte-icons/fa/FaLaptopCode.svelte";

  import { isDarkMode } from "../stores.js";

  import DarkModeButton from "../components/DarkModeButton.svelte";
  import projects from "../data/projects.js";

  let data = projects[params.id];
</script>

<style>
  .icon {
    @apply text-text-buttons;
    width: 25px;
    height: 25px;
    padding-top: 12%;
  }
  .links {
    width: 100px;
    height: 100px;
  }
  @screen sm {
    .links {
      width: 50px;
      height: 50px;
    }
  }
</style>

<div>
  <div class="flex items-center justify-between pl-10 pr-10">
    <div class="pt-3">
      <a href="/">
        <button
          class="{$isDarkMode ? 'bg-section-dark' : 'bg-section-light'}
          text-text-buttons font-bold py-2 px-4 mt-2 ml-2 border-b-4
          border-indigo-700 rounded">
          <div class="icon inline-block">
            <FaArrowLeft />
          </div>
          Back
        </button>
      </a>
    </div>
    <div class="pt-4">
      <DarkModeButton />
    </div>
  </div>
  <h1
    class="pb-2 text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.title}
  </h1>
  <hr
    class="mt-0 mx-12 pb-2 border-t-2 opacity-75 {$isDarkMode ? 'border-text-dark' : 'border-text-light'}" />
  <div
    class="px-5 py-5 opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {@html data.body}
  </div>
  <div class="flex items-center justify-evenly mb-3">
    {#if data.repoUrl !== ''}
      <a
        class="sm:col-start-3 hover:text-gray-600 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}"
        alt="GitHub repository"
        title="GitHub repository"
        href={data.repoUrl}
        target="_blank">
        <div
          class="links opacity-75">
          <DiGithubBadge />
        </div>
      </a>
    {/if}
    {#if data.demoUrl !== ''}
      <a
        class="sm:col-start-6 hover:text-red-700 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}"
        alt="Demo"
        title="Demo"
        href={data.demoUrl}
        target="_blank">
        <div
          class="links opacity-75">
          <FaLaptopCode />
        </div>
      </a>
    {/if}
  </div>
  <div class="grid grid-cols-3">
    <img class="col-start-2 rounded-md" src={data.image} alt={data.title} />
  </div>
</div>
