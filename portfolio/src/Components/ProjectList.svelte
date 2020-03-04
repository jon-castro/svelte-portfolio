<script>
  import { onMount } from "svelte";

  let data = [
    {
      id: 1,
      title: "Project title 1",
      summary: "Brief description 1",
      body: "Full project description 1",
      repoUrl: "repoUrlHere",
      demoUrl: "demoUrlHere",
      image: "imageLocationHere"
    },
    {
      id: 2,
      title: "Project title 2",
      summary: "Brief description 2",
      body: "Full project description 2",
      repoUrl: "repoUrlHere",
      demoUrl: "demoUrlHere",
      image: "imageLocationHere"
    },
    {
      id: 3,
      title: "Project title 3",
      summary: "Brief description 3",
      body: "Full project description 3",
      repoUrl: "repoUrlHere",
      demoUrl: "demoUrlHere",
      image: "imageLocationHere"
    },
    {
      id: 4,
      title: "Project title 4",
      summary: "Brief description 4",
      body: "Full project description 4",
      repoUrl: "repoUrlHere",
      demoUrl: "demoUrlHere",
      image: "imageLocationHere"
    }
  ];
</script>

<h1 id="projects" class="text-center text-light-tan">Projects</h1>

<!-- <a href="/project/{item.id}">{item.title}</a> -->
<div class="container my-12 mx-auto px-4 md:px-12">
  <div class="flex flex-wrap -mx-1 lg:-mx-4">
    {#each data as item}
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
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

          <footer
            class="flex items-center justify-between leading-none p-2 md:p-4">
            <a
              class="flex items-center no-underline hover:underline text-black"
              href="/project/{item.id}">
              <img
                alt="Placeholder"
                class="block rounded-full"
                src="https://picsum.photos/32/32/?random" />
              <p class="ml-2 text-sm">Author Name</p>
            </a>
            <a
              class="flex items-center no-underline hover:underline text-black"
              href="/project/{item.id}">
              <img
                alt="Placeholder"
                class="block rounded-full"
                src="https://picsum.photos/32/32/?random" />
              <p class="ml-2 text-sm">Author Name</p>
            </a>
          </footer>
        </article>
      </div>
      <!-- <div>
        <h5 />
      </div> -->
    {/each}
  </div>
</div>
