import { takeLatest } from 'redux-saga/effects'
import { fetchNotifications } from '@data/api/notification'
import { fetchNotificationsSuccess, fetchNotificationsError } from '@data/actions/notification'
import actionTypes from '@constants/actionTypes'
import { makeFetchNotificationsSaga } from './notificationSagas'

export function * watchNotifications () {
  yield takeLatest(actionTypes.NOTIFICATION_FETCH_REQUEST, makeFetchNotificationsSaga(fetchNotifications, fetchNotificationsSuccess, fetchNotificationsError))
}
