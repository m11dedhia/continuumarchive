# continuumarchive

## Stack
- decoupled Nuxt + Wordpress RESTful API (ACF)
- deploy via Netlify

## To Do (by July 25th)
- Missing Data on the Frontend
1. The entire list of the entries shown on the homepage does not match the entire list from https://continuummusic.ca/wp-json/acf/v3/concerts?per_page=1000
e.g. id: 681 exists in the database, but not showing on the homepage

- Checkbox Filter Discrepancy & Allow filtering though multiple checkboxes
1. CANADIAN PREMIERE
When this checkbox is checked, currently only two entires are showing. However, there are a lot more entire that meet the requirement.

2. WORLD PREMIERE
Same with this checkbox.
When WORLD PREMIERE is checked, the result is 37 entires.
When both WORLD PREMIERE & VIDEO are checked, the result is 89 entries.

3. IMAGE
Same with this checkbox.
When IMAGE is checked, the result is 17 entires.
When both IMAGE & VIDEO are checked, the result is 41 entries.

4. VIDEO
Same with this checkbox.

- Consolidate Dropdown Filtering

Allow users to search by different categories without the dropdown filtering

- Reduce Load Time







## To Do (by July 20th)
- Reduce Load Time
- Search (/components/SearchBeta.vue)
1. when search By Composition: hide the Concerts that do not include the input strings
2. when search By Composer: hide the Concerts that do not include the input strings
3. when search By Performer: show only the Compositions that include the input strings (line 300 - 303)
4. when Video is checked: hide the Concerts that do not contain any Composition that has Video
5. when World Premiere is checked: hide the Concerts that do not contain any Composition that has World Premiere
6. when Canadian Premiere is checked: hide the Concerts that do not contain any Composition that has Canadian Premiere
7. allow input to search contents that contain accents [Remove Accents](https://gist.github.com/marcelo-ribeiro/abd651b889e4a20e0bab558a05d38d77)
- Subpage
1. add lightbox function to section.concert-images
e.g. localhost:3000/concerts/932/

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
