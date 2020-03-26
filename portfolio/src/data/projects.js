let projects = [
  {
    id: 0,
    title: "jcastro.dev (this website)",
    summary: "A mobile first portfolio mainly using Svelte and Tailwind CSS",
    body: `
    <span>This very same website, </span><a class="text-indigo-600" href="https://jcastro.dev" target="_blank">jcastro.dev</a><span>, was built as a personal project to host links to my work and articles. It uses the </span><a class="text-indigo-600" href="https://svelte.dev/" target="_blank">Svelte</a><span> framework to fetch and show content, perform routing, and work out all logic. The </span><a class="text-indigo-600" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a><span> framework is used for most of the styling. The </span><a class="text-indigo-600" href="https://github.com/flekschas/svelte-simple-modal" target="_blank">svelte-simple-modal</a><span> repo was adapted for the site to be able to change based on the color schemes.</span>
    `,
    repoUrl: "https://github.com/jon-castro/svelte-portfolio",
    demoUrl: "",
    image: "/images/portfolio.png"
  }
];

export default projects;
