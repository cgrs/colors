import { html, LitElement, customElement, property, css } from 'lit-element'

@customElement('color-selector')
export default class ColorSelector extends LitElement {
  @property() color
  static get styles () {
    return css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }
    `
  }
  render () {
    return html`
    <style>
      :host {
        background-color: ${this.color}
      }

    </style>`
  }
}
