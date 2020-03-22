<script>
  import IoIosBriefcase from "svelte-icons/io/IoIosBriefcase.svelte";

  import { isDarkMode } from "../stores.js";
  // import skills from "../data/skills.js";

  import { getContext } from "svelte";
  import SkillsContent from "./SkillsContent.svelte";
  const { open } = getContext("simple-modal");
  const showSkillsContent = () => {
    open(SkillsContent, {}, {});
  };
</script>

<style>
  .icon {
    width: 50px;
    height: 50px;
  }
</style>

<button
  class="opacity-75 border-none {$isDarkMode ? 'text-text-dark' : 'text-text-light'}
  hover:text-yellow-800"
  alt="Skills"
  title="My skills"
  on:click={showSkillsContent}>
  <div class="icon">
    <IoIosBriefcase />
  </div>
</button>
