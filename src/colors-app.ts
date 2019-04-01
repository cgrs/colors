import {html, LitElement, customElement, property, css} from 'lit-element'
import './color-selector'
import * as Color from 'color'

@customElement('colors-app')
export default class ColorsApp extends LitElement {
  @property({type: Color, reflect: true}) current = Color.hsl(180,50,50)
  @property({type: Array}) colors = []

  static get styles () {
    return css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .color-selector {
      flex-grow: 1;
    }
    .color-selector.animated {
      animation: grow 200ms ease 0s 1 forwards;
    }
    @keyframes grow {
      0% {
        flex-grow: 0;
      }
      100% {
        flex-grow: 1;
      }
}
    `
  }
  selectColor (e) {
    const {clientX, clientY} = e
    const rect = this.shadowRoot.getElementById('main-selector').getBoundingClientRect()
    const [x, y] = [
      clientX / rect.width,
      clientY / rect.height
    ]
    this.current = this.current.hue(Math.floor(360*x)).lightness(Math.floor(100*y))
  }
  saveColor () {
    this.colors.push(this.current)
  }
  render () {
    const colorsTemplate = this.colors.map(
      color => html`<color-selector color='${color}' class='color-selector animated'/>`
    )

    return html`
      ${colorsTemplate}
      <color-selector class='color-selector' id='main-selector'
      color='${this.current}'
      @mousemove='${this.selectColor}'
      @click='${this.saveColor}'/>
    `
  }
}
