import React from 'react'
import { render, wait } from '@testing-library/react'
import axiosMock from 'axios'
import KarolCard from '../../KarolCard'

jest.mock('axios')

describe('<KarolCard />', () => {
  it('renders Karol page', async () => {
    axiosMock.get.mockResolvedValue({
      data: {
        id: 6,
        name: 'Karol',
        github: 'https://github.com/karlosos',
        avatar: 'https://www.gravatar.com/avatar/5721fbdfcafc3269ac39d9f98c6eba02?s=400',
        linkedin: 'https://www.linkedin.com/in/karol-dzialowski/'
      }
    })
    const { queryByTestId } = render(<KarolCard />)

    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(queryByTestId('karol-card')).toBeTruthy()
    await wait()
  })
})
