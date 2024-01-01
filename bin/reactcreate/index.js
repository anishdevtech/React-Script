#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require('shelljs');

const runScript = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Write the name of your project:',
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Choose the framework:',
      choices: ['React', 'Vue', 'Angular', 'Svelte', 'Vanilla'],
    },
    {
      type: 'list',
      name: 'variant',
      message: 'Choose the variant:',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: 'confirm',
      name: 'useTailwind',
      message: 'Do you want to use Tailwind for styling?',
    },
    {
      type: 'confirm',
      name: 'useFramerMotion',
      message: 'Do you want to use Framer Motion for styles?',
    },
    {
      type: 'list',
      name: 'animationLibrary',
      message: 'Choose the animation library:',
      choices: ['Framer Motion', 'Anime.js', 'GSAP', 'None'],
    },
  ]);

  const { projectName, framework, variant, useTailwind, useFramerMotion, animationLibrary } = answers;

  // Run Vite script
  shell.exec(`
    npx create-vite ${projectName} --template ${framework.toLowerCase()}${variant.toLowerCase()} --yes
    cd ${projectName}
    ${useTailwind ? 'npm install -D tailwindcss' : ''}
    ${useFramerMotion ? 'npm install framer-motion' : ''}
    ${animationLibrary !== 'None' ? `npm install ${animationLibrary.toLowerCase()}` : ''}
    npm install
    npm run dev
  `);
};

runScript();
