import React from 'react'
import './ColorSelector.css'

const ColorSelector = ({color, reference, ...props}) => (
  <div
    ref={reference}
    style={{
      backgroundColor: color.string()
    }}
    {...props}></div>
)

export default ColorSelector
