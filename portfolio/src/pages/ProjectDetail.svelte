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
    @apply text-white;
    width: 25px;
    height: 25px;
    padding-top: 5%;
  }
  .links-section-all-present {
    @apply grid;
    @apply grid-flow-row;
    @apply grid-cols-7;
    @apply grid-rows-1;
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
  <div class="grid grid-flow-row grid-cols-6 grid-rows-1">
    <div class="col-start-2 col-span-2 pt-3">
      <a href="/">
        <button
          class="{$isDarkMode ? 'bg-section-dark' : 'bg-section-light'}
          text-text-buttons font-bold py-2 px-4 mt-2 ml-2 border-b-4
          border-indigo-700 rounded">
          <div class="icon inline-block">
            <FaArrowLeft />
          </div>
          Back to Projects List
        </button>
      </a>
    </div>
    <div class="col-start-6 pt-4">
      <DarkModeButton />
    </div>
  </div>
  <h1
    class="pb-2 text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.title}
  </h1>
  <hr
    class="mt-0 mx-12 pb-2 border-t-2 opacity-75 {$isDarkMode ? 'border-text-dark' : 'border-text-light'}" />
  <p
    class="px-5 py-5 opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.body}
  </p>
  <div class="links-section-all-present">
    {#if data.repoUrl !== ''}
      <a
        class="sm:col-start-3"
        alt="GitHub repository"
        href={data.repoUrl}
        target="_blank">
        <div
          class="links opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
          <DiGithubBadge />
        </div>
      </a>
    {/if}
    {#if data.demoUrl !== ''}
      <a class="sm:col-start-6" alt="Demo" href={data.demoUrl} target="_blank">
        <div
          class="links opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
          <FaLaptopCode />
        </div>
      </a>
    {/if}
  </div>
  <div class="">
    <img src={data.image} alt={data.title} />
  </div>
</div>
