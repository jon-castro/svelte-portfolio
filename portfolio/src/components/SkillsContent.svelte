<script>
  import marked from "marked";
  import skills from "../data/skills";

  // let source = "# This variable";
  let source = skills;
  let markdown = marked(source);
</script>

<div class="markdown-editor__output">
  {@html markdown}
</div>
<!-- <script>
  export let message;
</script><p>🎉 {message} 🍾</p> -->
