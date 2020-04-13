import actionTypes from '../../common/constants/actionTypes'

const initialState = {
  notifications: [],
  fetchError: undefined,
  fetching: false,
  isDrawerOpen: false
}

export default function notification (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_FETCH_REQUEST:
      return { ...state, fetching: true, fetchError: undefined }
    case actionTypes.NOTIFICATIONS_FETCH_SUCCESS:
      return { ...state, fetching: false, notifications: action.notifications }
    case actionTypes.NOTIFICATIONS_FETCH_FAIL:
      return { ...state, fetching: false, fetchError: action.error }
    case actionTypes.NOTIFICATIONS_FETCH_CANCEL:
      return { ...state, fetching: false, fetchError: undefined }
    case actionTypes.NOTIFICATION_DRAWER_OPEN:
      return { ...state, isDrawerOpen: true }
    case actionTypes.NOTIFICATION_DRAWER_CLOSE:
      return { ...state, isDrawerOpen: false }
    case actionTypes.NOTIFICATIONS_CHECKED:
      return {
        ...state,
        notifications:
        state.notifications.map(notification =>
          notification.id === action.id ? ({ ...notification, isChecked: true }) : notification
        )
      }
    default:
      return state
  }
}
