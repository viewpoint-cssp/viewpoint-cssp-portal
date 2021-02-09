# viewpoint-cssp-portal

This is the VIEWpoint-CSSP portal. It is a work-in-progress.

-   Completed:
    -   skeleton of website
    -   navigation (components also available for use in SUHI and WRM)
    -   links to SUHI and WRM demonstrators
    -   catalogue
    -   about page
    -   skeleton of training materials
    -   draft explainers
    -   proof of concept for glossary
-   To do list includes (in no particular order and possibly incomplete):
    -   add IEA and UoR logos in footer
    -   translations where required
    -   review all images and reduce physical size
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

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Building for serving on GitHub Pages

-   **Important** Requires a `gh-pages` branch in the repo.
-   This does an `npm run build` and then commits and pushes to the `gh-pages`
    branch of the repo.
-   Don't forget to remove `/dist` from `.gitignore` before running.

```
bash deploy.sh
```

## Generating the JSON from Zotero

-   In Zotero, select the Export Menu option from the File menu.
    -   Select the BibLaTeX option and ensure the character encoding is Unicode
        (UTF-8).
-   Check the filenames and paths for the source .bib and the target .js in
    `convert_bib_to_json.py` are correct and run.

-   Move the generated .js file to this repo's /src/js directory if the path
    wasn't set explicitly.
    -   Rename the file to `VIEWpoint-json.js` if required (it is case
        sensitive).
-   **Don't forget** to update the repo with the changes.

-   **To update the website**, follow the instruction above to rebuild for
    serving on GitHub Pages. (The process should not take many minutes.)
