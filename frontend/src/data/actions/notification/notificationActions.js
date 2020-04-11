import actionTypes from '../../../common/constants/actionTypes'

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

export function openNotificationDrawer () {
  return {
    type: actionTypes.NOTIFICATION_DRAWER_OPEN
  }
}
export function closeNotificationDrawer () {
  return {
    type: actionTypes.NOTIFICATION_DRAWER_CLOSE
  }
}
