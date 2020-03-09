import React from 'react'
import renderer from 'react-test-renderer'
import KarolCard from '../../KarolCard'

// todo mock fetch

describe('<KarolCard />', () => {
  it('renders Karol page', () => {
    const component = renderer.create(
      <KarolCard />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
