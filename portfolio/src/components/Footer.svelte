<script>
  import { isDarkMode } from "../stores.js";
</script>

<footer
  class="pt-10 pb-2 text-center opacity-75 {$isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}">
  &copy;2020 Jonathan Castro
</footer>
