import {html, css, LitElement} from 'lit'

import './components/color-picker'
import * as Color from 'color'

export default class ColorsApp extends LitElement {
    static styles = css`
        :host {
            display: flex;
            width: 100%;
            height: 100vh;
            position: fixed;
        }
        color-picker span {
            cursor: pointer;
        }
        color-picker > * {
            mix-blend-mode: difference;
            color: white;
            font-weight: bold;
        }
    `
    static properties = {
        colors: {
            type: Array
        },
        current: {
            type: Color
        }
    }
    constructor() {
        super()
        this.current = new Color({h: 180, s: 50, l: 50})
        this.getColorsFromPreviousState()
    }
    connectedCallback() {
        super.connectedCallback()
        window.scrollTo({
            top: window.innerHeight/2,
            behavior: 'smooth'
        })
        window.addEventListener('hashchange', (ev) => this.getColorsFromPreviousState(ev))
    }
    render () {
        return html`${this.colors.map((c, i) => html`<color-picker .color="${c.hex()}"><p>${c.hex()}</p><span title="remove" @click="${() => this.removeColor(i)}">&times;</span></color-picker>`)}
        <color-picker .color="${this.current.hex()}" @mousemove="${this.getColor}" @click="${this.saveColor}" @wheel="${this.setSaturation}"></color-picker>`
    }

    saveColor(e) {
        this.colors = [...this.colors, this.current]
        const state = window.history.state
        if (state) {
            window.history.replaceState(this.colors, '', this.colors.map(c => c.hex()).join())
        } else {
            window.history.pushState(this.colors, '', this.colors.map(c => c.hex()).join())
        }
    }

    removeColor(ix) {
        this.colors = [...this.colors.slice(0,ix), ...this.colors.slice(ix+1)]
        const state = window.history.state
        if (state) {
            if (this.colors.length !== 0) {
                window.history.replaceState(this.colors, '', this.colors.map(c => c.hex()).join())
            } else {
                window.location.hash = ''
                window.history.replaceState(null, '')
            }
        } else {
            if (this.colors.length !== 0) {
                window.history.pushState(this.colors, '', this.colors.map(c => c.hex()).join())
            } else {
                window.location.hash = ''
            }
        }
    }

    getColor(e) {
        const bounds = e.target.getBoundingClientRect()
        const hue = Math.floor((e.screenX / bounds.width) * 360)
        const lightness = Math.floor((e.clientY / window.innerHeight) * 100)
        this.current = this.current.hue(hue).lightness(lightness)
    }

    setSaturation() {
        const saturation = Math.floor((window.scrollY / window.innerHeight) * 100)
        this.current = this.current.saturationl(saturation)
    }

    getColorsFromPreviousState(ev) {
        const hash = window.location.hash
        const state = window.history.state
        try {
            if (state && (Array.isArray(state) && state.length !== 0)) {
                this.colors = state.map(c => Color(c.color))
            } else if (hash !== '') {
                this.colors = hash.split(',').map(c => Color(c))
                window.history.pushState(this.colors, '', this.colors.map(c => c.hex()).join())
            } else {
                this.colors = []
            }
        } catch (err) {
            console.warn('inconsistent state, fallback to defaults')
            this.colors = []
        }
    }
}

customElements.define('colors-app', ColorsApp)