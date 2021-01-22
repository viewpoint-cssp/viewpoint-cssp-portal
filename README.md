# viewpoint-cssp-portal

This is the VIEWpoint-CSSP portal. It is a work-in-progress.

-   Completed:
    -   skeleton of website
    -   navigation (although some nav menu options are disabled)
    -   links to SUHI and WRM demonstrators
-   To do list includes (in no particular order and possibly incomplete):
    -   incorporate the catalogue currently hosted stand-alone on the-iea repo
    -   test ease-of-deployment of NavMenu.vue andFull name for demonstrators
        Footer.vue in SUHI and WRM repos
    -   define and build the training materials page(s)
    -   build and enable (or remove from nav options)
        -   explainers
        -   videos
        -   handbook
    -   add logos and their hyperlinks in footer
    -   create an about page based on WeChat documents and add link to nav
        options
    -   translations where required
    -   possible requirement to reduce physical size of images
    -   further browser and responsiveness testing

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Builds for serving on GitHub Pages

-   **Important** Requires a `gh-pages` branch in the repo.
-   This does an `npm run build` and then commits and pushes to the `gh-pages`
    branch of the repo.
-   Don't forget to remove `/dist` from `.gitignore` before running.

```
bash deploy.sh
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
