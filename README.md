# html-template-lite

Simple template with html code escape for both node.js and browser.

[![npm Package Version](https://img.shields.io/npm/v/html-template-lite.svg?maxAge=3600)](https://www.npmjs.com/package/html-template-lite)

Loops and conditions are intentionally not handled by this library. They can be handled natively with javascript expression _outside_ the template, e.g. in component's code.

## Features

- [x] Extremely simple, the [source code](./src/index.ts) is below 1KB
- [x] 100% test coverage with ts-mocha

## Installation

### Install for npm projects:

```bash
pnpm install html-template-lite
```

or

```bash
yarn add html-template-lite
```

or

```bash
npm install html-template-lite
```

### Direct usage from browser (via script over CDN)

```html
<main class="demo"></main>

<template class="demo">
  <p>username: {username}</p>
  <p>version: v{version}</p>
</template>

<script type="module">
  let main = document.querySelector('main.demo')
  let template = document.querySelector('template.demo')
  main.textContent = 'loading html-template-lite ...'

  import { render } from 'https://cdn.jsdelivr.net/npm/html-template-lite/dist/esm/index.js'

  main.innerHTML = render(template.innerHTML, {
    username: '<b>o</b>',
    version: '1.2.3',
  })
</script>
```

Details see [example/demo.html](./example/demo.html)

## Typescript Signature

```typescript
export function render(
  template: string,
  data: object[] | object,
  separator: string = '',
): string
```

## Usage Guideline

The `render()` function takes a html `template` in string, and a `data`` object. It substitutes the object fields into the template and return composed html fragment in string.

If the `data` is an array of object, it will be mapped over the `render()` function again and joined with the given `separator`.

If the separator is not specified, each rendered html fragment will be joined without extra characters.

### Placeholder Syntax in `template`

- use `{field}` to sanitize and substitute literal (act like setting `element.textContent`)
- use `[field]` to substitute trusted html fragment (act like setting `element.innerHTML`)

## Usage Example

### Substitute Context Object

```typescript
import { render } from 'html-template-lite'

let html = render(
  `
<div>Name: {name}</div>
<div>Rank: {rank}</div>
`,
  { name: "<b>o's</b>", rank: 42 },
)
console.log(html)
/*
<div>Name: &lt;b&gt;o&apos;s&lt;/b&gt;</div>
<div>Rank: 42</div>
*/
```

Details see [example/demo.ts](./example/demo.ts)

### Substitute List of Objects

```typescript
import { render } from 'html-template-lite'

let listTemplate = `<ul>
[items]
</ul>`
let itemTemplate = `  <li><a href="{url}">{title}</a></li>`

let items = [
  { url: 'https://github.com', title: 'Github' },
  { url: 'https://gitlab.com', title: 'Gitlab' },
  { url: 'https://bitbucket.org', title: 'Bitbucket' },
]

let html = render(listTemplate, {
  items: render(itemTemplate, items, '\n'),
})
console.log(html)
/*
<ul>
  <li><a href="https://github.com">Github</a></li>
  <li><a href="https://gitlab.com">Gitlab</a></li>
  <li><a href="https://bitbucket.org">Bitbucket</a></li>
</ul>
*/
```

Details see [example/demo.ts](./example/demo.ts)

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
