import { expect } from 'chai'
import { render } from '../src'

describe('Template TestSuit', () => {
  it('should has render() function', () => {
    expect(render).is.a('function')
  })
  it('should render string and number', () => {
    expect(
      render('username: {username}, rank: {rank}', {
        username: 'bob',
        rank: 20,
      }),
    ).to.equals('username: bob, rank: 20')
  })
  it('should render single item', () => {
    let template = /* html */ `
<ul>
  <li><a href="{href}">{name}</a></li>
</ul>
`
    let item = {
      href: '/product.html?name=apple',
      name: 'apple',
    }
    expect(render(template, item)).to.equals(/* html */ `
<ul>
  <li><a href="/product.html?name=apple">apple</a></li>
</ul>
`)
  })
  it('should render multiple items', () => {
    let listTemplate = /* html */ `
<ul>[items]
</ul>
`
    let itemTemplate = /* html */ `
  <li><a href="{href}">{name}</a></li>`
    let items = [
      {
        href: '/product.html?name=apple',
        name: 'apple',
      },
      {
        href: '/product.html?name=banana',
        name: 'banana',
      },
    ]
    expect(render(listTemplate, { items: render(itemTemplate, items) })).to
      .equals(/* html */ `
<ul>
  <li><a href="/product.html?name=apple">apple</a></li>
  <li><a href="/product.html?name=banana">banana</a></li>
</ul>
`)
  })
  Object.entries({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    '[': '&#91;',
    ']': '&#93;',
  }).forEach(([string, html]) => {
    it(`should escape ${string} into ${html}`, () => {
      expect(render(`{code}`, { code: string })).to.equals(html)
    })
  })
  it('should escape mixed html code', () => {
    expect(
      render('username: {username}, rank: {rank}', {
        username: "<b>o's</b>",
        rank: '"20"',
      }),
    ).to.equals('username: &lt;b&gt;o&apos;s&lt;/b&gt;, rank: &quot;20&quot;')
  })
})
