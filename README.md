# kitchen

a project is a recipe that can be cooked (rendered) to a dish

extra components like chopping board for sample usage


## roadmap
- memento pattern (save project state after each change so undo/ctrl+z can be used)
- effects on master channel
- implement [React FlexLayout](https://github.com/caplin/FlexLayout) windowing system 

### features
- [ ] AIDAW Window
  - [ ] Main Menu Bar
    - [ ] FILE
      - [ ] New Project -> save changes to currently opened?
      - [ ] Open Project -> save changes to currently opened?
      - [ ] Save Project -> if first save ask project name
      - [ ] Save Project as... -> file dialog: file (project) name and location
      - [ ] Export
        - [ ] Wav/Mp3 File -> file dialog: rendered file name and location -> extra render pop-up: choose format (mp3/wav), display render progress bar
        - [ ] Project File (zip) -> file dialog: file (project) name and location
    - [ ] EDIT
      - [ ] undo
      - [ ] redo
    - [ ] PATTERN
      - [ ] hover menu for each pattern -> click -> select pattern
        - [ ] Add -> dialog: enter pattern name
        - [ ] Clone
        - [ ] Delete
    - [ ] SETTINGS
      - [ ] theme (like implemented)
      - [ ] daw config
        - [ ] (file) editor
        - [ ] load daw config
        - [ ] save daw config

  - [ ] Playlist View
    - [ ] Playlist Menu Bar
      - [ ] Selected Pattern
        - [ ] for each pattern -> click -> select pattern
    - [ ] Playlist "Map"
      - [ ] left click @track:offset -> add selected pattern there
      - [ ] right click @track:offset -> remove selected pattern there

  - [ ] Pattern View
    - [ ] Pattern Menu Bar
      - [ ] Selected Pattern
        - [ ] for each pattern -> click -> select pattern
    - [ ] Plugin View -> maybe popup
    - [ ] Effects View -> effects chain -> maybe popup

---------------


<img src=".erb/img/erb-banner.png" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Dependency Status][david-image]][david-url]
[![DevDependency Status][david-dev-image]][david-dev-url]
[![Github Tag][github-tag-image]][github-tag-url]

[![OpenCollective](https://opencollective.com/electron-react-boilerplate/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/sponsors/badge.svg)](#sponsors)
[![Good first issues open][good-first-issue-image]][good-first-issue-url]
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
yarn
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/electron-react-boilerplate#backer)]

<a href="https://opencollective.com/electron-react-boilerplate/backer/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/electron-react-boilerplate-594#sponsor)]

<a href="https://opencollective.com/electron-react-boilerplate/sponsor/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/29/avatar.svg"></a>

## Maintainers

- [Amila Welihinda](https://github.com/amilajack)
- [John Tran](https://github.com/jooohhn)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
[david-image]: https://img.shields.io/david/electron-react-boilerplate/electron-react-boilerplate.svg
[david-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate
[david-dev-image]: https://img.shields.io/david/dev/electron-react-boilerplate/electron-react-boilerplate.svg?label=devDependencies
[david-dev-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate?type=dev
[good-first-issue-image]: https://img.shields.io/github/issues/electron-react-boilerplate/electron-react-boilerplate/good%20first%20issue.svg?label=good%20first%20issues
[good-first-issue-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"
