import React from 'react'
import { cleanup } from '@testing-library/react'
import TestRenderer, { create } from 'react-test-renderer'
import WarningSnackbar, { fetchData, url } from './WarningSnackbar.jsx'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe('WarningSnackbar component', () => {
  it('Matches the snapshot', () => {
    const snackbar = create(<WarningSnackbar />)
    expect(snackbar.toJSON()).toMatchSnapshot()
  })

  describe('Fetching data', () => {
    let mock
    let wrapper
    let snackbarOpen
    let setOpen
    let useStateSpy

    beforeEach(() => {
      mock = new MockAdapter(axios)
      wrapper = shallow(<WarningSnackbar />)
      snackbarOpen = wrapper.find('#snackbar').props().open
      setOpen = jest.fn()
      useStateSpy = jest.spyOn(React, 'useState')
      useStateSpy.mockImplementation((open) => [open, setOpen])
    })

    afterEach(() => jest.clearAllMocks())

    it('Fetches successfully data and keeps WarningSnackbar closed', async () => {
      mock.onGet(url).reply(200, { message: 'OK' })
      const expected = async () => fetchData(5000).then(response => response.data).catch(error => error)

      expect(expected()).resolves.toEqual({ message: 'OK' })
      expect(setOpen).toHaveBeenCalledTimes(0)
      expect(snackbarOpen).toBe(false)
    })

    it('Fetches with timeout and Warningsnackbar is opened', async () => {
      const { act } = TestRenderer
      mock.onGet(url).timeout()
      await act(async () => {
        await fetchData(5000).then(response => response.data).catch(error => error)
      })

      setTimeout(() => {
        expect(setOpen).toHaveBeenCalledTimes(1)
        expect(snackbarOpen).toBe(true)
      }, 5000)
    })
  })
})
