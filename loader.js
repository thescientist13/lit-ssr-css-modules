import fs from 'node:fs/promises';

export async function load(url, context, nextLoad) {
  if (context?.importAttributes?.type === 'css') {
    console.log('SSR Stylesheet detected...');
    const contents = await fs.readFile(new URL(url), 'utf-8');

    return {
      format: 'module',
      source: `
        const sheet = new CSSStyleSheet();sheet.replaceSync(\`${contents}\`);export default sheet;
      `,
      shortCircuit: true
    }
  }

  return nextLoad(url, context, nextLoad);
} 