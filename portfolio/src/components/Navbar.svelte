<script>
  import { isDarkMode } from "../stores.js";
  import DarkModeButton from "./DarkModeButton.svelte";

  let isMenuOpen = false;
  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<style>
  a {
    text-decoration: none;
    @apply text-text-buttons;
  }
</style>

<header
  id="header"
  class={$isDarkMode ? 'bg-section-dark' : 'bg-section-light'}>
  <div class="flex items-center justify-between px-4 py-3">
    <img
      class="h-8 hidden sm:block"
      src="/images/jcastro.dev_text_logo.png"
      alt="Welcome to Jonathan Castro's page!" />
    <div class="sm:hidden justify-start">
      <button
        type="button"
        class="block text-text-buttons hover:text-orange-600 focus:outline-none"
        on:click={toggleMenu}>
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          {#if isMenuOpen}
            <path
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1
              1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1
              1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828
              4.829 4.828 4.828z" />
          {:else}
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1
              1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
          {/if}
        </svg>
      </button>
    </div>
    <a
      href="/"
      class="mt-1 px-2 py-3 font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Home
    </a>
    <a
      href="#projects"
      class="mt-1 px-2 py-3 font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Projects
    </a>
    <!-- <a
      href="#articles"
      class="mt-1 px-2 py-3 font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Articles
    </a> -->
    <img
      class="h-8 sm:hidden {isMenuOpen ? 'hidden' : 'justify-between'}"
      src="/images/jcastro.dev_text_logo.png"
      alt="Welcome to Jonathan Castro's page!" />
    <DarkModeButton />
  </div>
</header>
