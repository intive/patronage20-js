import React from 'react'
import { cleanup } from '@testing-library/react'
import { create } from 'react-test-renderer'
import WarningSnackbar from './index'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { delayResponse: 5000 })

const timer = (callback) => {
  console.log('Ready....go!')
  setTimeout(() => {
    callback()
  }, 1000)
}
jest.useFakeTimers()

afterEach(cleanup)
describe('WarningSnackbar component', () => {
  it('Matches the snapshot', () => {
    const snackbar = create(<WarningSnackbar />)
    expect(snackbar.toJSON()).toMatchSnapshot()
  })

  it('check response', () => {
    const snackbar = create(<WarningSnackbar />)

    mock.onGet('/.well-known/health-check').reply(200, { message: 'OK' })

    timer(axios.get('/.well-known/health-check').then(response => {
      console.log(response.data)
    }), 5000)
  })
})
