<script>
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";

  import { isDarkMode } from "../stores.js";

  function toggleDarkMode() {
    isDarkMode.update(mode => !mode);
  }
</script>

<style>
  .icon {
    @apply text-text-dark;
    width: 40px;
    height: 40px;
  }
</style>

<button class="icon rounded-full" on:click={toggleDarkMode}>
  {#if $isDarkMode === true}
    <IoIosSunny />
  {:else}
    <IoIosMoon />
  {/if}
</button>
