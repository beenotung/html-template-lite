import express from 'express'
import { print } from 'listening-on'
import { render } from '../src'

const app = express()

app.get('/', (req, res) => {
  res.end(
    render(
      /* html */ `
	<div class="card">
	  <div class="author">"{username}"</div>
		<div class="likes">{likes} likes</div>
		<div class="version">v{version}</div>
		<div class="content">[content]</div>
	</div>
  <div>square bracket []: {square_bracket}</div>
  <div>angle bracket {}: {angle_bracket}</div>
	`,
      {
        username: "<b>o's</b>",
        likes: 42,
        version: '1.2.3',
        content: '<font color="red">rich text content</font>',
        angle_bracket: '{}',
        square_bracket: '[]',
      },
    ),
  )
})

const port = 3000
app.listen(port, () => {
  print(port)
})
