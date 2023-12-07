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
[items]
</ul>`
const itemTemplate = /* html */ `  <li><a href="{url}">{title}</a></li>`

const items = [
  { url: 'https://github.com', title: 'Github' },
  { url: 'https://gitlab.com', title: 'Gitlab' },
  { url: 'https://bitbucket.org', title: 'Bitbucket' },
]
const body = render(listTemplate, {
  items: render(itemTemplate, items, '\n'),
})
console.log(body)

/*
<ul>
<li><a href="https://github.com">Github</a></li>
<li><a href="https://gitlab.com">Gitlab</a></li>
<li><a href="https://bitbucket.org">Bitbucket</a></li>
</ul>
*/
