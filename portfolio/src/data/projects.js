let projects = [
  {
    id: 0,
    title: ".NET Core 3 - UI Test Suite",
    summary:
      "Testing Suite for showcasing UI automation processes using the demo web app at Swag Labs.",
    body: `
    <span>The test suite uses </span><a class="text-indigo-600" href="https://dotnet.microsoft.com/download/dotnet-core/3.1" target="_blank"><u>.NET Core 3 (C#)</u></a><span> to run </span><a class="text-indigo-600" href="https://www.selenium.dev/" target="_blank"><u>Selenium WebDriver</u></a><span>, it is organized using POM (Page Object Model) principles.</span>
    </br></br>
    <span>Hosted as a git project on Azure DevOps.</span>
    `,
    repoUrl: "",
    demoUrl:
      "https://dev.azure.com/jcastrogarcia/Selenium%20UI%20test%20suite%20-%20.NET%20Core%203/_git/saucedemo-ui-test-suite",
    image: "/images/ui_test_suite_csharp.png",
    tag: "Automated Testing",
  },
  {
    id: 1,
    title: "GeoInfo.cc",
    summary: "Instantly retrieve information about a location with a search.",
    body: `
    <span>This React application is a study in using API calls, hooks, and components for a front-end dependent on external APIs. The application can be found at </span><a class="text-indigo-600" href="https://geoinfo.cc" target="_blank"><u>geoinfo.cc</u></a></br></br><p>The following technologies are used:</p><ul><li><a class="text-indigo-600" href="https://reactjs.org/" target="_blank"><u>React Create React App & Hooks</u></a></li><li><a class="text-indigo-600" href="https://www.npmjs.com/package/axios" target="_blank"><u>axios</u></a></li><li><a class="text-indigo-600" href="https://developers.google.com/places/web-service/intro" target="_blank"><u>Google Maps Place Autocomplete API</u></a></li><li><a class="text-indigo-600" href="https://openweathermap.org/api" target="_blank"><u>OpenWeather API</u></a></li><li><a class="text-indigo-600" href="https://developer.foursquare.com/" target="_blank"><u>Foursquare API</u></a></li><li>... among others.</li></ul>
    </br>
    <span>Hosted as a static website on </span><a class="text-indigo-600" href="https://aws.amazon.com/s3/" target="_blank"><u>AWS S3.</u></a>
    `,
    repoUrl: "https://github.com/jon-castro/svelte-portfolio",
    demoUrl: "https://geoinfo.cc",
    image: "/images/geoinfocc.png"
  },
  {
    id: 2,
    title: "jcastro.dev (this website)",
    summary: "A mobile first portfolio mainly using Svelte and Tailwind CSS",
    body: `
    <span>This very same website, </span><a class="text-indigo-600" href="https://jcastro.dev" target="_blank"><u>jcastro.dev</u></a><span>, was built as a personal project to host links to some of my work. It uses the </span><a class="text-indigo-600" href="https://svelte.dev/" target="_blank"><u>Svelte</u></a><span> framework to fetch and show content, perform routing, and work out all logic. The </span><a class="text-indigo-600" href="https://tailwindcss.com/" target="_blank"><u>Tailwind CSS</u></a><span> framework is used for most of the styling. The </span><a class="text-indigo-600" href="https://github.com/flekschas/svelte-simple-modal" target="_blank"><u>svelte-simple-modal</u></a><span> repo was adapted for the site to be able to change based on the color schemes.</span>
    </br></br>
    <span>Hosted on </span><a class="text-indigo-600" href="https://aws.amazon.com/lightsail/" target="_blank"><u>AWS Lightsail</u></a><span> using Linux and nginx.</span>
    `,
    repoUrl: "https://github.com/jon-castro/svelte-portfolio",
    demoUrl: "",
    image: "/images/portfolio.png",
    tag: "Front End",
  },
];

export default projects;
