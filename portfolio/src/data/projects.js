let projects = [
  {
    id: 0,
    title: ".NET Core 3 - UI Test Suite",
    summary: "Testing Suite for showcasing UI automation processes using the demo web app at Swag Labs.",
    body: `
    <span>The test suite uses </span><a class="text-indigo-600" href="https://dotnet.microsoft.com/download/dotnet-core/3.1" target="_blank"><u>.NET Core 3 (C#)</u></a><span> to run </span><a class="text-indigo-600" href="https://www.selenium.dev/" target="_blank"><u>Selenium WebDriver</u></a><span>, it is organized using POM (Page Object Model) principles.</span>
    </br></br>
    <span>Hosted as a git project on Azure DevOps.</span>
    `,
    repoUrl: "",
    demoUrl: "https://dev.azure.com/jcastrogarcia/Selenium%20UI%20test%20suite%20-%20.NET%20Core%203/_git/saucedemo-ui-test-suite",
    image: "/images/ui_test_suite_csharp.png"
  },
  {
    id: 1,
    title: "jcastro.dev (this website)",
    summary: "A mobile first portfolio mainly using Svelte and Tailwind CSS",
    body: `
    <span>This very same website, </span><a class="text-indigo-600" href="https://jcastro.dev" target="_blank"><u>jcastro.dev</u></a><span>, was built as a personal project to host links to my work and articles. It uses the </span><a class="text-indigo-600" href="https://svelte.dev/" target="_blank"><u>Svelte</u></a><span> framework to fetch and show content, perform routing, and work out all logic. The </span><a class="text-indigo-600" href="https://tailwindcss.com/" target="_blank"><u>Tailwind CSS</u></a><span> framework is used for most of the styling. The </span><a class="text-indigo-600" href="https://github.com/flekschas/svelte-simple-modal" target="_blank"><u>svelte-simple-modal</u></a><span> repo was adapted for the site to be able to change based on the color schemes.</span>
    `,
    repoUrl: "https://github.com/jon-castro/svelte-portfolio",
    demoUrl: "",
    image: "/images/portfolio.png"
  }
];

export default projects;
