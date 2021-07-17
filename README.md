# continuumarchive

## Stack
- decoupled Nuxt + Wordpress RESTful API (ACF)
- deploy via Netlify

## To Do
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
