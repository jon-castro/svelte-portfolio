<script>
  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
  import IoLogoLinkedin from "svelte-icons/io/IoLogoLinkedin.svelte";
  import IoIosMail from "svelte-icons/io/IoIosMail.svelte";

  import { isDarkMode } from "../stores.js";
</script>

<style>
  #linkedin-logo:hover {
    color: #0077b5;
  }
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
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
      hover:text-gray-600"
      alt="GitHub profile"
      title="Me at GitHub"
      href="https://github.com/jon-castro"
      target="_blank">
      <div class="icon">
        <DiGithubBadge />
      </div>
    </a>
    <a
      id="linkedin-logo"
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}"
      alt="LinkedIn"
      title="Me at LinkedIn"
      href="https://www.linkedin.com/in/jonathan-castro-garcia"
      target="_blank">
      <div class="icon">
        <IoLogoLinkedin />
      </div>
    </a>
    <a
      class="opacity-75 {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
      hover:text-yellow-500"
      alt="Email"
      title="Send me an email"
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
