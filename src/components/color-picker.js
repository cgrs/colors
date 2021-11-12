import {LitElement, html, css} from 'lit'

export default class ColorPicker extends LitElement {
    static styles = css`
        :host {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    `
    static properties = {
        color: String
    }

    render() {
        return html`
        <style>
            :host {
                background-color: ${this.color}
            }
        </style>
        <slot></slot>
        `
    }
}

customElements.define('color-picker', ColorPicker)