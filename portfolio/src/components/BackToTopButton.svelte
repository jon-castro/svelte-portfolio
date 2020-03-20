<script>
  import IoMdArrowDropupCircle from "svelte-icons/io/IoMdArrowDropupCircle.svelte";

  import { isDarkMode } from "../stores.js";
</script>

<!-- Original button -->
<!-- <a href="#header">
  <button
    class="h-12 w-12 bg-red-700 opacity-50 sm:opacity-25 md:hover:opacity-100
    border-none cursor-pointer fixed bottom-0 right-0 outline-none">
    Top
  </button>
</a> -->

<a
  href="#header"
  class="icon h-12 w-12 text-red-700 opacity-50 sm:opacity-25
  md:hover:opacity-100 fixed bottom-0 right-0 outline-none border-none">
  <IoMdArrowDropupCircle />
</a>
