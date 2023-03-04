import parse, {Element} from 'html-react-parser'

/**
 * Parse HTML content into React components.
 *
 * @see https://www.npmjs.com/package/html-react-parser
 */
export default function ParseContent(content: string) {
  // Make sure we have content to parse.
  const contentToParse = content ?? null

  // If we have content, parse it.
  if (contentToParse) {
    const options = {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.attribs.class === 'remove') {
          return <></>
        }
      }
    }

    return parse(contentToParse, options)
  }

  // Otherwise, return null.
  return null
}
