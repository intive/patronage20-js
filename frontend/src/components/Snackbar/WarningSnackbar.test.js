import React from 'react'
import { cleanup } from '@testing-library/react'
import { create } from 'react-test-renderer'
import WarningSnackbar from './index'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { delayResponse: 5000 })

afterEach(cleanup)
describe('WarningSnackbar component', () => {
  it('Matches the snapshot', () => {
    const snackbar = create(<WarningSnackbar />)
    expect(snackbar.toJSON()).toMatchSnapshot()
  })

  it('check response', () => {
    jest.useFakeTimers()
    const snackbar = create(<WarningSnackbar />)

    const setState = jest.fn()
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])

    mock.onGet('/.well-known/health-check').reply(200, { message: 'OK' })

    axios.get('/.well-known/health-check').then(response => {
      console.log(response)
    })
    expect(setState).toHaveBeenCalledTimes(0) // Success!

    jest.advanceTimersByTime(5000)
    axios.get('/.well-known/health-check').then(response => {
      console.log(response)
    })
    // expect(setState).toHaveBeenCalledTimes(2)
  })
})
