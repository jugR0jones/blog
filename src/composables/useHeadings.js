import { marked } from 'marked';

export function useHeadings() {
  const extractHeadings = (content) => {
    const tokens = marked.lexer(content);
    const headings = [];
    
    tokens.forEach(token => {
      if (token.type === 'heading' && token.tokens) {
        const text = token.tokens.map(t => t.text).join('');
        const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
        headings.push({
          level: token.depth,
          text: text,
          slug: slug
        });
      }
    });
    
    return headings;
  };

  return {
    extractHeadings
  };
}
