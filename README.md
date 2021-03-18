# viewpoint-cssp-portal

This is the VIEWpoint-CSSP portal. It is a work-in-progress.

-   To do list includes (in no particular order and possibly incomplete):
    -   translations where required
    -   review all images and reduce physical size
    -   continuing browser and responsiveness testing
    -   final versions of PDFs, remove 'Draft's
    -   video IDs, video resolution selector
    -   add audiocast
    -   proper page not found for invalid /page

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

## Serving on GitHub Pages

```
bash deploy.sh
```

-   **Important** Requires the `gh-pages` branch in this repo.
-   This does an `npm run build` and then commits and pushes to the `gh-pages`
    branch of this repo.
-   Don't forget to remove `/dist` from `.gitignore` before running.

## Generating the Catalogue JSON from Zotero

The conversion routine has been written in Python and can be found in the
`python` directory.

-   Ensure the VIEWpoint library in your Zotero desktop app is the latest
    version. If the latest version is the one on zotero.org, the desktop app
    needs to by synced with the web version first.

-   In the Zotero desktop app, select the Export Library... option from the File
    menu.

    -   Use the BibLaTeX option and ensure the Character Encoding is Unicode
        (UTF-8). Leave the other checkbox options unchecked.

-   Check the filenames and paths are correct for the source `.bib` and the
    target `.txt` in `convert_bib_to_json.py` and run the program.

    -   To show it's working, it echoes the expected number of entries, the
        entry IDs as they're being converted, and ends with a count of the
        converted entries - which should match the first number.

-   Rename the file to `catalogue.txt` if required. If you have a local clone of
    this repo, this file should be located in the `/public` directory.

-   **Don't forget to update this repo** with the change.

    -   Although it is not necessary to rebuild the website to update the
        Catalogue, it is important to keep this repo up-to-date in case someone
        ever needs to clone and rebuild the website in future. This can be done
        without having to go through the rigmarole of cloning this repo by going
        to the `/public` directory of the `master` branch in the GitHub web app
        and using the `Add file` button to `Upload files` and `Commit changes`.

-   **To update the website**

    -   **Either** just upload `catalogue.txt` into the root of the `gh-pages`
        of this repo (use the `Add file` button in the GitHub web app to
        `Upload files` and `Commit changes`)
    -   **Or** follow the instruction above to rebuild for serving on GitHub
        Pages.
    -   Check the website to ensure the Catalogue has the expected number of
        entries. You may need to do a hard refresh (shift-F5), just in case the
        page has been cached in your browser.

## Generating the Glossary from a spreadsheet

-   Remove any unnecessary rows and columns from the worksheet to leave a header
    row and the glossary rows. The column headers themselves can be anything but
    the expected columns are:

    -   the term in English,
    -   its definition in English,
    -   the term translated into Chinese,
    -   a fuller explanation in Chinese,
    -   any comments, which can include URLs and Chinese characters.

-   Save the worksheet as a CSV file called `glossary.csv`. If you have a local
    clone of this repo, this file should be located in the `/public` directory.

-   **Don't forget to update this repo** with the change.

    -   Although it is not necessary to rebuild the website to update the
        Glossary, it is important to keep this repo up-to-date in case someone
        ever needs to clone and rebuild the website in future. This can be done
        without having to go through the rigmarole of cloning this repo by going
        to the `/public` directory of the `master` branch in the GitHub web app
        and using the `Add file` button to `Upload files` and `Commit changes`.

-   **To update the website**

    -   **Either** just upload `glossary.csv` into the root of the `gh-pages`
        branch of this repo (use the `Add file` button in the GitHub web app to
        `Upload files` and `Commit changes`)
    -   **Or** follow the instruction above to rebuild for serving on GitHub
        Pages.
    -   Check the website to ensure the Glossary has been updated. You may need
        to do a hard refresh (shift-F5), just in case the page has been cached
        in your browser.
