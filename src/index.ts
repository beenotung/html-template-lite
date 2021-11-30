export function render(template: string, data: object) {
  Object.entries(data).forEach(([key, value]) => {
    const strValue = String(value)
    const htmlValue = escape(strValue)

    template = template.split(`{${key}}`).join(htmlValue)
    template = template.split(`[${key}]`).join(strValue)
  })
  return template
}

// escape table reference: https://ascii.cl/htmlcodes.htm
const escapeText: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
  '[': '&#91;',
  ']': '&#93;',
}

function escape(text: string) {
  // look up approach reference: https://stackoverflow.com/a/30970751/3156509
  return text.replace(/[&"'<>\[\]]/g, c => escapeText[c])
}
