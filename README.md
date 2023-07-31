![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Branchen Puls

**This application is a prototype. It may contain errors and small bugs. If you notice something you can report an Issue. Thank you!**

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ratione, fuga earum obcaecati consectetur quisquam non architecto accusamus qui exercitationem tenetur. Nihil fugit nobis eius itaque ratione blanditiis sed. Doloribus.

## Context

This application is based on open data. Open data is an important part of Berlin's administrative activities and on top of creating transparency, enables analysis and applications like this. You can find more open data at the [Berlin Open Data Portal](https://daten.berlin.de).

## Data

You can find the raw data on the [IHK Gewerbedaten Github repo](https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/master)

## Tech stack

This website is a NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

## Project structure

Basic Next.js app

## Getting started

### Requirements

#### Node.js

This project is a Next.js app which requires you to have [Node.js](https://nodejs.org/en/) installed.

### Installation

Clone the repository to your local machine:

```bash
git clone git@github.com:technologiestiftung/ihk-vis.git
```

Move into the repository folder:

```bash
cd ihk-vis
```

Make sure you use the Node.js version specified in `.nvmrc`. Find out which Node version you're currently on with:

```bash
node --version
```

If this version differs from the one specified in `.nvmrc`, please install the required version, either manually, or using a tool such as [nvm](https://github.com/nvm-sh/nvm), which allows switching to the correct version via:

```bash
nvm use
```

With the correct Node version, install the dependencies:

```bash
npm install
```

Because the map uses a basemap from maptiler (https://www.maptiler.com/), you will need to provide connection details in your environment. In this repository you can find a file `.env.example`. Duplicate this file and name it `.env`.

In `.env` you must enter the connection details to the Maptiler style file as suggested in `.env.example`. If you do not know how to obtain the necessary details, please ask a repository maintainer for access. You can also use other basemaps by providing your own style file.

You are now ready to start a local development server on http://localhost:3000 via:

```bash
npm run dev
```

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

- In your local repository, checkout the `main` branch.
- Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits guidelines](https://www.conventionalcommits.org)).
- Make your changes
- Push your changes to the remote: `git push -u origin HEAD`
- Open a pull request.

You can commit using the `npm run cm` command to ensure your commits follow our conventions.

## Deployment

The app is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Map

The basemap style was created with maptiler (https://www.maptiler.com/). Please note, that you need to update the MAPKEY with your own project's mapkey. You can also use any other basemap by adapting the code in the _src/Map_ folder.

## Page analytics

We use [Matomo](https://matomo.org/) for website analytics. Matomo is respectful of the users' privacy, the page visits are tracked anonymously.

In the production environment, a `NEXT_PUBLIC_MATOMO_URL` and `NEXT_PUBLIC_MATOMO_SITE_ID` is configured for this purpose.

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-arce"><img src="https://avatars.githubusercontent.com/u/8709861?v=4?s=64" width="64px;" alt="Raphael.A"/><br /><sub><b>Raphael.A</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=raphael-arce" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

Illustrations by {MARIA_MUSTERFRAU}, all rights reserved.

## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>

## Related Projects
