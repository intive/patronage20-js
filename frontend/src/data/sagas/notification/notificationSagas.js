import { put, call, race, take } from 'redux-saga/effects'

import actionTypes from '@constants/actionTypes.js'

export function makeFetchNotificationsSaga (getNotifications, makeSuccessAction, makeErrorAction) {
  return function * fetchNotificationsSaga () {
    try {
      const result = yield race({
        notifications: call(getNotifications),
        cancel: take(actionTypes.NOTIFICATIONS_FETCH_CANCEL)
      })
      if (result.notifications instanceof Error) {
        throw result.notifications
      }
      if (!result.cancel) {
        yield put(makeSuccessAction(result.notifications))
      }
    } catch (error) {
      yield put(makeErrorAction(error))
    }
  }
}
