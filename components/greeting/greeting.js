import { html, css, LitElement } from 'lit';
import sheet from './greeting.css' with { type: 'css' }

export class SimpleGreeting extends LitElement {
  static styles = [ sheet ];

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

customElements.define('simple-greeting', SimpleGreeting);