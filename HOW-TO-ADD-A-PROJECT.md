# Adding a new project

The homepage builds itself from `projects.js`, so a new project takes three steps.

1. **Add the project's site.** Create a folder `work/<slug>/` (for example `work/nike/`) and put the project's `index.html` and its images inside it.
2. **Add a cover image.** Save a 4:5 image (1080 × 1350 works well) as `covers/<slug>.jpg`. The first carousel slide of the project's Canva kit is a good choice.
3. **Add one entry to `projects.js`.** Copy an existing entry, paste it at the top of the list (newest first) and change the text:

```js
{
  slug: "nike",
  brand: "Nike",
  title: "Your campaign line",
  summary: "One sentence on what the project is.",
  type: ["campaign"],          // any of: campaign, brand, social, crm
  market: "US + UK",
  url: "work/nike/"
},
```

Add `featured: true` (and a `theme` like the Allbirds and IKEA entries) to also show it in the large Featured row.

To show visitors a way back, paste this just before `</body>` in the project's `index.html`:

```html
<a class="as-allwork" href="../../#work">&larr; All work</a>
```

and copy the matching `<style>` block from any existing project in `work/`.

Commit and push to `main`. GitHub Pages updates in a minute or two.
