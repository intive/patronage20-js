import { put, call } from 'redux-saga/effects'

export function makeFetchNotificationsSaga (getNotifications, makeSuccessAction, makeErrorAction) {
  return function * fetchNotificationsSaga () {
    try {
      const result = yield call(getNotifications)
      if (result.notifications instanceof Error) {
        throw result.notifications
      }
      if (result.length > 0) {
        yield put(makeSuccessAction(result))
      }
    } catch (error) {
      yield put(makeErrorAction(error))
    }
  }
}
