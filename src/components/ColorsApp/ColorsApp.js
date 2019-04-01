import React, { Component } from 'react'
import Color from 'color'
import './ColorsApp.css'
import ColorSelector from '../ColorSelector'

class ColorsApp extends Component {
  constructor () {
    super ()
    const hist = window.history.state || []
    this.state = {
      current: Color({h: 180, s: 50, l: 50}),
      colors: hist.map(Color)
    }
    this.currrentColorSelector = React.createRef()
    window.scrollTo({
      top: window.innerHeight/2
    })
  }

  mouseMove (e) {
    let {current} = this.state
    const {clientX, clientY} = e
    const rect = this.currrentColorSelector.current.getBoundingClientRect()
    const [x, y] = [
      clientX/rect.width,
      clientY/rect.height
    ]
    current = current
      .hue(Math.floor(360*x))
      .lightness(Math.floor(100*y))
    this.setState({...this.state, current})
  }

  saveColor () {
    const colors = this.state.colors.slice()
    colors.push(this.state.current)
    window.history.pushState(
      colors.map(c => c.hex()), document.title, colors.map(c => c.hex()).join()
    )
    this.setState({...this.state, colors})
  }
  changeSaturation (e) {
    let {current} = this.state
    const z = (window.scrollY*2) / document.body.scrollHeight
    current = current.saturationl(100*z)
    this.setState({...this.state, current})
  }
  render () {
    const colors = this.state.colors
    const current = this.state.current
    return (
      <div className='colors-app'>
        {
          colors.map(
            (color, index) => (
              <ColorSelector key={index} color={color} className='color-selector animated'/>
            )
          )
        }
        <ColorSelector
          color={current}
          className='color-selector'
          reference={this.currrentColorSelector}
          onMouseMove={e => this.mouseMove(e)}
          onClick={e => this.saveColor(e)}
          onWheel={e => this.changeSaturation(e)}
        />
      </div>
    )
  }
}

export default ColorsApp
