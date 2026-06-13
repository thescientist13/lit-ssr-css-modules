import '@lit-labs/ssr-dom-shim/register-css-hook.js';

import fs from 'node:fs/promises';
import { html } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
await import('./components/greeting/greeting.js');

const OUTPUT_DIR = new URL('./public/', import.meta.url);
const OUTPUT_FILE = new URL('./index.html', OUTPUT_DIR);

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const greetingResult = html`
  <simple-greeting></simple-greeting>
  <simple-greeting name="SSR"></simple-greeting>
`;
const greetingHtml = await collectResult(render(greetingResult));

console.log({ greetingHtml });

await fs.writeFile(OUTPUT_FILE, greetingHtml);