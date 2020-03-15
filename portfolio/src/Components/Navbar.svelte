<script>
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";

  let isMenuOpen = false;
  let isDarkMode = true;

  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
  const toggleDarkMode = () => (isDarkMode = !isDarkMode);
</script>

<style>
  .link {
  }
  .icon {
    @apply text-text-dark;
    width: 40px;
    height: 40px;
  }
</style>

<header>
  <div class="flex items-center justify-between px-4 py-3">
    <img
      class="h-8 hidden sm:block"
      src="/images/jcastro.dev_text_logo.png"
      alt="Welcome to Jonathan Castro's page!" />
    <div class="sm:hidden justify-start">
      <button
        type="button"
        class="block text-gray-500 hover:text-white focus:text-white
        focus:outline-none"
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
      class="mt-1 px-2 py-3 text-gray font-semibold rounded {isMenuOpen ? 'block ml-8 mt-1 mb-0' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Home
    </a>
    <a
      href="#projects"
      class="mt-1 px-2 py-3 text-white font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Projects
    </a>
    <a
      href="#articles"
      class="mt-1 px-2 py-3 text-white font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Articles
    </a>
    <a
      href="#contact"
      class="mt-1 px-2 py-3 text-white font-semibold rounded {isMenuOpen ? 'block' : 'hidden'}
      sm:inline-block sm:justify-between link">
      Contact
    </a>
    <img
      class="h-8 sm:hidden {isMenuOpen ? 'hidden' : 'justify-between'}"
      src="/images/jcastro.dev_text_logo.png"
      alt="Welcome to Jonathan Castro's page!" />
    <button class="icon rounded-full">
      {#if isDarkMode}
        <IoIosSunny />
      {:else}
        <IoIosMoon />
      {/if}
    </button>
  </div>
</header>
