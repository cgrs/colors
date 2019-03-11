import React, { Component } from 'react'
import Color from 'color'
import './ColorsApp.css'
import ColorSelector from '../ColorSelector'

class ColorsApp extends Component {
  constructor () {
    super ()
    this.state = {
      current: Color({h: 180, s: 50, l: 50}),
      colors: []
    }
    this.mouseMove = this.mouseMove.bind(this)
    this.saveColor = this.saveColor.bind(this)
    this.currrentColorSelector = React.createRef()
  }

  mouseMove (e) {
    let {current} = this.state
    const {pageX, pageY} = e
    const rect = this.currrentColorSelector.current.getBoundingClientRect()
    const [x, y] = [pageX/rect.width, pageY/rect.height]
    current = current
      .hue(Math.floor(360*x))
      .lightness(Math.floor(100*y))
    this.setState({...this.state, current})
  }

  saveColor () {
    const colors = this.state.colors.slice()
    colors.push(this.state.current)
    this.setState({...this.state, colors})
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
          onMouseMove={this.mouseMove}
          onClick={this.saveColor}
        />
      </div>
    )
  }
}

export default ColorsApp
