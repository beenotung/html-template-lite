# html-template-lite

Simple template with html code escape

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

### Direct usage from browser

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

### Iterate over list

```typescript
import { render } from 'html-template-lite'

let listTemplate = `<ul>
[listHTML]
</ul>`
let itemTemplate = `  <li><a href="{url}">{title}</a></li>`

let items = [
  { url: 'https://github.com', title: 'Github' },
  { url: 'https://gitlab.com', title: 'Gitlab' },
  { url: 'https://bitbucket.org', title: 'Bitbucket' },
]
let listHTML = items.map(item => render(itemTemplate, item)).join('\n')
let body = render(listTemplate, { listHTML })
console.log(body)
/*
<ul>
  <li><a href="https://github.com">Github</a></li>
  <li><a href="https://gitlab.com">Gitlab</a></li>
  <li><a href="https://bitbucket.org">Bitbucket</a></li>
</ul>
*/
```
