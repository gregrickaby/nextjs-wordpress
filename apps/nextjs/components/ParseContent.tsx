import parse, {Element, HTMLReactParserOptions} from 'html-react-parser'

/**
 * Parse HTML content into React components.
 *
 * @see https://www.npmjs.com/package/html-react-parser
 */
export default function ParseContent(content: string) {
  const options: HTMLReactParserOptions = {
    // @see https://github.com/remarkablemark/html-react-parser#replace
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs.class === 'remove') {
        return <></>
      }
    }
  }

  return parse(content, options)
}
