<script>
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";

  import { isDarkMode } from "../stores.js";

  function toggleDarkMode() {
    isDarkMode.update(mode => !mode);
  }
</script>

<button
  class="w-10 h-10 outline-none rounded-full {$isDarkMode ? 'text-text-dark' : 'text-text-light'}"
  on:click={toggleDarkMode}>
  {#if $isDarkMode === true}
    <IoIosSunny />
  {:else}
    <IoIosMoon />
  {/if}
</button>
