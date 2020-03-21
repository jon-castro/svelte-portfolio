<script>
  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
  import IoMdBriefcase from "svelte-icons/io/IoMdBriefcase.svelte";
  import IoIosMail from "svelte-icons/io/IoIosMail.svelte";

  import { isDarkMode } from "../stores.js";
</script>

<style>
  .icon {
    width: 50px;
    height: 50px;
  }
</style>

<div>
  <h1
    class="p-8 pb-0 text-5xl text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    JONATHAN CASTRO
  </h1>
  <h2
    class="p-4 pt-0 pb-2 text-2xl text-center opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    WEB DEVELOPER & SOFTWARE QUALITY ASSURANCE ENGINEER
  </h2>
  <hr
    class="mt-0 mx-12 pb-2 border-t-2 opacity-75 {$isDarkMode ? 'border-text-dark' : 'border-text-light'}" />
  <div class="flex items-center justify-evenly pb-2">
    <a
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}"
      alt="GitHub profile"
      href="https://github.com/jon-castro"
      target="_blank">
      <div class="icon">
        <DiGithubBadge />
      </div>
    </a>
    <a
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
      hover:text-yellow-900"
      alt="Skills"
      href="https://github.com/jon-castro"
      target="_blank">
      <div class="icon">
        <IoMdBriefcase />
      </div>
    </a>
    <a
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
      hover:text-teal-200"
      alt="Email"
      href="mailto:contact@jcastro.dev"
      target="_blank">
      <div class="icon">
        <IoIosMail />
      </div>
    </a>
  </div>
  <hr
    class="mt-0 mx-12 pb-10 border-t-2 opacity-75 {$isDarkMode ? 'border-text-dark' : 'border-text-light'}" />
</div>
