<script>
  export let params;

  import FaArrowLeft from "svelte-icons/fa/FaArrowLeft.svelte";

  import { isDarkMode } from "../stores.js";

  import DarkModeButton from "../components/DarkModeButton.svelte";
  import articles from "../data/articles";

  let data = articles[params.id];
</script>

<style>
  .icon {
    @apply text-text-buttons;
    width: 25px;
    height: 25px;
    padding-top: 12%;
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
  <!-- <p
    class="px-5 py-5 opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {data.body}
  </p> -->
  <div
    class="text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    {@html data.body}
  </div>
  <div class="grid grid-cols-3">
    <img class="col-start-2" src={data.image} alt={data.title} />
  </div>
</div>
