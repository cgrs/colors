import React from 'react'
import ColorSelector from './ColorSelector'
import renderer from 'react-test-renderer'

describe('ColorSelector', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ColorSelector color={{
      string: () => '#000000'
    }}/>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
