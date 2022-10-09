import parse, {Element, HTMLReactParserOptions, domToReact} from 'html-react-parser'
import {Blockquote} from "@mantine/core";

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

      if(domNode instanceof Element && domNode.name === 'blockquote') {
       return(<Blockquote>
          {domToReact(domNode.children, options)}
          Life is like an npm install – you never know what you are going to get.
        </Blockquote>)
      }
    }
  }

  return parse(content, options)
}
