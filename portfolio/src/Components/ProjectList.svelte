<script>
  import { onMount } from "svelte";

  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
  import FaLaptopCode from "svelte-icons/fa/FaLaptopCode.svelte";

  import projects from "../data/projects.js";

  let data = projects;
</script>

<style>
  .icon {
    @apply text-red-700;
    width: 50px;
    height: 50px;
  }
</style>

<h1 id="projects" class="text-center text-light-tan">Projects</h1>

<div class="container my-12 mx-auto px-4 md:px-12">
  <div class="flex flex-wrap justify-center -mx-1 lg:-mx-4">

    {#each data as item}
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 xl:w-1/4">
        <article class="bg-dark-yellow overflow-hidden rounded-lg shadow-lg">
          <a href="/project/{item.id}">
            <img
              alt="Placeholder"
              class="block h-auto w-full"
              src={item.image} />
          </a>
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 class="text-lg">
              <a
                class="no-underline hover:underline text-light-tan"
                href="/project/{item.id}">
                {item.title}
              </a>
            </h1>
          </header>
          <footer class="flex justify-evenly leading-none p-2 md:p-4">
            {#if item.repoUrl !== ''}
              <a
                class="flex no-underline hover:underline text-black"
                alt="GitHub repository"
                href={item.repoUrl}
                target="_blank">
                <div class="icon">
                  <DiGithubBadge />
                </div>
              </a>
            {/if}
            {#if item.demoUrl !== ''}
              <a
                class="flex no-underline hover:underline text-black"
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
