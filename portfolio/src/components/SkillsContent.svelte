<script>
  import marked from "marked";

  let source = "# This variable";
  let markdown = marked(source);
</script>

<div class="markdown-editor__output">
  {@html markdown}
</div>
<!-- <script>
  export let message;
</script><p>🎉 {message} 🍾</p> -->
