<script>
  import { isDarkMode } from "../stores.js";
</script>

<style>
  #myBtn {
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    border-radius: 10px; /* Rounded corners */
  }
</style>

{#if }
   <!-- content here -->
{:else}
   <!-- else content here -->
{/if}
<a href="#header">
  <button
    id="myBtn"
    class="h-10 w-10 bg-red-700 hover:bg-indigo-800 outline-none {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    Top
  </button>
</a>
