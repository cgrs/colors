import React from 'react'
import './ColorSelector.css'

const ColorInfo = ({color}) => (
  <div className='color-info info-container'>
    <p className='color-info color'>{color.hex()}</p>
    <p className='color-info info'>click to save</p>
  </div>
)
const ColorSelector = ({color, reference, ...props}) => (
  <div
    ref={reference}
    style={{
      backgroundColor: color.string()
    }}
    {...props}>
    <ColorInfo color={color}/>
  </div>
)

export default ColorSelector
