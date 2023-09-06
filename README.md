![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Branchen Puls

**This application is a prototype. It may contain errors and small bugs. If you notice something you can report an Issue. Thank you!**

BranchenPuls is based on open data from the Berlin Chamber of Commerce and Industry and contains information about around 350.000 member companies like the geolocation, the specific business field, founding date or the approximate number of employees. With the help of BranchenPuls you can explore the data set by setting different filters. For example you can filter all companies in a specific business field in a spatial unit like the berlin districts. The data set will be updated monthly starting in july 2023 which allows you to follow the development of Berlins business over time. 

![screenshot](/public/screenshot.png)

## Context

This application is based on open data. Open data is an important part of Berlin's administrative activities and on top of creating transparency, enables analysis and applications like this. You can find more open data at the [Berlin Open Data Portal](https://daten.berlin.de). The Berlin Chamber of Commerce and Industry as an important stakeholder in the berlin open data ecosystem and is committed to puplish open data also to convince other stakeholder to open their data as a benefit for everyone. If you are interested to learn more about the activities or if you have any questions you can contact directly the [data management team]([https://daten.berlin.de](https://www.ihk.de/berlin/service-und-beratung/digitalisierung/open-data-5691102))

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

The app is deployed to the cloud with [Netlify](https://www.netlify.com/).

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
      <td align="center" valign="top" width="14.28%"><a href="https://hanshack.com/"><img src="https://avatars.githubusercontent.com/u/8025164?v=4?s=64" width="64px;" alt="Hans Hack"/><br /><sub><b>Hans Hack</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=hanshack" title="Code">💻</a> <a href="https://github.com/technologiestiftung/ihk-vis/commits?author=hanshack" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lisa-Stubert"><img src="https://avatars.githubusercontent.com/u/61182572?v=4?s=64" width="64px;" alt="Lisa-Stubert"/><br /><sub><b>Lisa-Stubert</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=Lisa-Stubert" title="Code">💻</a> <a href="https://github.com/technologiestiftung/ihk-vis/commits?author=Lisa-Stubert" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fabianmoronzirfas.me"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt="Fabian Morón Zirfas"/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=ff6347" title="Code">💻</a> <a href="https://github.com/technologiestiftung/ihk-vis/commits?author=ff6347" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fhp.incom.org/profile/9200/projects"><img src="https://avatars.githubusercontent.com/u/46717848?v=4?s=64" width="64px;" alt="anna"/><br /><sub><b>anna</b></sub></a><br /><a href="#design-annameide" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KlemensM"><img src="https://avatars.githubusercontent.com/u/98896505?v=4?s=64" width="64px;" alt="Klemens"/><br /><sub><b>Klemens</b></sub></a><br /><a href="#ideas-KlemensM" title="Ideas, Planning, & Feedback">🤔</a> <a href="#data-KlemensM" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-arce"><img src="https://avatars.githubusercontent.com/u/8709861?v=4?s=64" width="64px;" alt="Raphael.A"/><br /><sub><b>Raphael.A</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=raphael-arce" title="Code">💻</a> <a href="https://github.com/technologiestiftung/ihk-vis/pulls?q=is%3Apr+reviewed-by%3Araphael-arce" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jaszkowic"><img src="https://avatars.githubusercontent.com/u/10830180?v=4?s=64" width="64px;" alt="Jonas Jaszkowic"/><br /><sub><b>Jonas Jaszkowic</b></sub></a><br /><a href="https://github.com/technologiestiftung/ihk-vis/commits?author=Jaszkowic" title="Code">💻</a> <a href="https://github.com/technologiestiftung/ihk-vis/pulls?q=is%3Apr+reviewed-by%3AJaszkowic" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dnsos"><img src="https://avatars.githubusercontent.com/u/15640196?v=4?s=64" width="64px;" alt="Dennis Ostendorf"/><br /><sub><b>Dennis Ostendorf</b></sub></a><br /><a href="#design-dnsos" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      Made by: <a href="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      Together with: <a href="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a href="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
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
