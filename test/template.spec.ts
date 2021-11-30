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
