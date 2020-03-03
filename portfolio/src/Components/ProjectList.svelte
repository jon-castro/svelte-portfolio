<script>
  import { onMount } from "svelte";

  const apiUrl = "/data/projects.json";
  let data = [];

  // onMount(async () => {
  //   const response = await fetch(apiUrl);
  //   data = await response.json();
  // });
  fetch(apiUrl)
    .then(response => response)
    .then(data => {
      data = data;
      console.log(data);
    });
</script>

<h1 id="projects">Projects</h1>

{#each data as item}
  <div>
    <h5>
      <a href="/project/{item.id}">{item.title}</a>
    </h5>
  </div>
{/each}
