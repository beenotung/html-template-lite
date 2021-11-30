import { render } from 'html-template-lite'

const html = render(
  /* html */ `
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

const listTemplate = /* html */ `<ul>
[listHTML]
</ul>`
const itemTemplate = /* html */ `  <li><a href="{url}">{title}</a></li>`

const items = [
  { url: 'https://github.com', title: 'Github' },
  { url: 'https://gitlab.com', title: 'Gitlab' },
  { url: 'https://bitbucket.org', title: 'Bitbucket' },
]
const listHTML = items.map(item => render(itemTemplate, item)).join('\n')
const body = render(listTemplate, { listHTML })
console.log(body)
/*
<ul>
<li><a href="https://github.com">Github</a></li>
<li><a href="https://gitlab.com">Gitlab</a></li>
<li><a href="https://bitbucket.org">Bitbucket</a></li>
</ul>
*/
