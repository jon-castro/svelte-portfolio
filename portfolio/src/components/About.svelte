<script>
  import { isDarkMode } from "../stores.js";
</script>

<div>
  <h1
    class="p-8 pb-0 text-5xl text-center {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    JONATHAN CASTRO
  </h1>
  <h2
    class="p-4 pt-0 pb-2 text-2xl text-center {$isDarkMode ? 'text-text-dark' : 'text-text-light'}">
    WEB DEVELOPER & SOFTWARE QUALITY ASSURANCE ENGINEER
  </h2>
  <hr
    class="mt-0 mx-12 pb-10 border-t-2 {$isDarkMode ? 'border-text-dark' : 'border-text-light'}" />
</div>
