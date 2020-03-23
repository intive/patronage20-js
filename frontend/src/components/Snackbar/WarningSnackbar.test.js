import React from 'react'
import { render, cleanup } from '@testing-library/react'
import WarningSnackbar from './index'

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<WarningSnackbar />)
  expect(asFragment(<WarningSnackbar />)).toMatchSnapshot()
})
