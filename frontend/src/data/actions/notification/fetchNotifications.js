import actionTypes from '@constants/actionTypes'

export function fetchNotificationsRequest () {
  return {
    type: actionTypes.NOTIFICATIONS_FETCH_REQUEST
  }
}

export function fetchNotificationsSuccess (notifications) {
  return {
    type: actionTypes.NOTIFICATIONS_FETCH_SUCCESS,
    notifications
  }
}

export function fetchNotificationsError (error) {
  return {
    type: actionTypes.NOTIFICATIONS_FETCH_FAIL,
    error
  }
}

export function fetchNotificationsCancel () {
  return {
    type: actionTypes.NOTIFICATIONS_FETCH_CANCEL
  }
}
