import axios from 'axios'
import mockNotifications from './mockNotifications'

export const fetchNotifications = async () => {
  try {
    // const result = await fetch('/api/v1/notifications') // TODO: use it if endpoint is ready
    // return result
    return mockNotifications
  } catch (error) {
    console.error(error)
  }
}
