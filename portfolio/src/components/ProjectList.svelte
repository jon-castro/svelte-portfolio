<script>
  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
  import FaLaptopCode from "svelte-icons/fa/FaLaptopCode.svelte";

  import projects from "../data/projects.js";
  import { isDarkMode } from "../stores.js";

  let data = projects;
</script>

<style>
  .icon {
    width: 50px;
    height: 50px;
  }
</style>

<h1
  id="projects"
  class="text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
  Projects
</h1>

<div
  class="container mt-2 mx-auto px-4 md:px-12 {$isDarkMode ? 'bg-background-dark' : 'bg-background-light'}">
  <div class="flex flex-wrap justify-center -mx-1 lg:-mx-4">
    {#each data as item}
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 xl:w-1/4">
        <article
          class="overflow-hidden rounded-lg shadow-lg border-2 {$isDarkMode ? 'border-section-dark' : 'border-section-light'}">
          <a href="/project/{item.id}">
            <img
              alt={item.title}
              title={item.title}
              class="block h-auto w-full"
              src={item.image} />
          </a>
          <header
            class="flex items-center justify-center leading-tight p-2 md:p-4 {$isDarkMode ? 'bg-secondary-dark' : 'bg-secondary-light'}">
            <h1 class="text-lg">
              <a
                class="no-underline hover:underline opacity-75 font-bold
                text-text-buttons"
                href="/project/{item.id}">
                {item.title}
              </a>
            </h1>
          </header>
          <h6
            class="m-4 text-center {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
            {item.summary}
          </h6>
          <footer class="flex justify-evenly leading-none p-2 md:p-4">
            {#if item.repoUrl !== ''}
              <a
                class="flex no-underline hover:underline opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
                hover:text-gray-600"
                alt="GitHub repository"
                title="GitHub repository"
                href={item.repoUrl}
                target="_blank">
                <div class="icon">
                  <DiGithubBadge />
                </div>
              </a>
            {/if}
            {#if item.demoUrl !== ''}
              <a
                class="flex no-underline hover:underline opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
                hover:text-red-700"
                alt="Demo"
                title="Demo"
                href={item.demoUrl}
                target="_blank">
                <div class="icon">
                  <FaLaptopCode />
                </div>
              </a>
            {/if}
          </footer>
        </article>
      </div>
    {/each}
  </div>
</div>
