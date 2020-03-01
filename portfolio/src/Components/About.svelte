<script>
  let img_bg = "../../public/images/about_bg.jpg";
</script>

<style>
  @media (max-width: 599px) {
    img {
      display: none;
    }
    .container {
      position: relative;
      min-width: 100%;
      text-align: center;
    }
    .centeredName {
      text-align: center;
      padding: 15px;
    }
    .centeredSubtitle {
      text-align: center;
      padding-bottom: 10px;
    }
  }
  @media (min-width: 600px) {
    img {
      -webkit-mask-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(0, 0, 0, 1)),
        to(rgba(0, 0, 0, 0))
      );
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
      width: 100%;
      display: block;
    }
    .container {
      position: relative;
      min-width: 100%;
      text-align: center;
    }
    .centeredName {
      position: absolute;
      top: 30%;
      left: 10%;
    }
    .centeredSubtitle {
      position: absolute;
      top: 40%;
      left: 10%;
    }
  }
</style>

<div class="container">
  <img class="fill-current " src={img_bg} alt="About Me" />
  <h1 class="centeredName text-red-600">Jonathan Castro</h1>
  <h2 class="centeredSubtitle text-red-600">
    web developer and software quality assurance professional
  </h2>
</div>
