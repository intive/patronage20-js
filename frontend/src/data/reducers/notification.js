import actionTypes from '../../common/constants/actionTypes'
const initialState = {
  notifications: [],
  fetchError: undefined,
  fetching: false
}

export default function author (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_FETCH_REQUEST:
      return { ...state, fetching: true, fetchError: undefined }
    case actionTypes.NOTIFICATIONS_FETCH_SUCCESS:
      return { ...state, fetching: false, notifications: action.notifications }
    case actionTypes.NOTIFICATIONS_FETCH_FAIL:
      return { ...state, fetching: false, fetchError: action.error }
    case actionTypes.NOTIFICATIONS_FETCH_CANCEL:
      return { ...state, fetching: false, fetchError: undefined }
    default:
      return state
  }
}
