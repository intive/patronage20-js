import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Layout from '../Layout.jsx'
import i18n from '../../i18n'

const mockStore = configureStore([])

describe('<DashboardContent />', () => {
  let store

  let initialRoute
  beforeEach(async () => {
    initialRoute = ['/']
    store = mockStore({
      notification: {
        notifications: [{
          id: 1,
          timestamp: 1777777777,
          type: 'alert',
          sensorId: 1
        },
        {
          id: 2,
          timestamp: 1666666666,
          type: 'alert',
          sensorId: 1
        }]
      },
      sensor: {
        sensors: {
          temperatureSensors: [
            {
              id: 1,
              type: 'TEMPERATURE_SENSOR',
              value: 21
            }]
        }
      }
    })
  })

  afterEach(cleanup)

  it('renders DashboardContent component', async () => {
    const { queryByTestId } = render(
      <Provider store={store}>

        <MemoryRouter initialEntries={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <Layout />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>

    )
    expect(queryByTestId('dashboard-id')).toBeTruthy()
  })
})
