import { all } from 'redux-saga/effects'
import { watchHome } from '@data/sagas/homeSaga'
import { watchAuthors, watchAuthor } from '@data/sagas/author'
import { watchSensors } from '@data/sagas/sensor'
import { watchDB } from '@data/sagas/db'
import { watchNotifications } from '@data/sagas/notification'

// Here should be added future sagas watchers
export default function * rootSaga () {
  yield all([
    watchHome(),
    watchAuthors(),
    watchAuthor(),
    watchSensors(),
    watchDB(),
    watchNotifications()
  ])
}
