import axios from 'axios'
import mockNotifications from './mockNotifications'
import { delay } from 'redux-saga/effects'

export function * fetchNotifications () {
  // const result = yield axios.get('/api/v1/dashboard') // TODO: use it if endpoint is ready; return an array
  // return res.data
  console.log('Fetching...')

  yield delay(3000)
  return mockNotifications
}
