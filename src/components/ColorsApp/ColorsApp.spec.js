import React from 'react'
import ColorsApp from './ColorsApp'
import renderer from 'react-test-renderer'

describe('ColorsApp', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ColorsApp/>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
