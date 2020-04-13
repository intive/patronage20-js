import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Divider, Typography, Link, Box } from '@material-ui/core'
import TemporaryDrawerList from './TemporaryDrawerList.jsx'
import Spinner from '../Spinner'
import Page404 from '../Page404'
import {
  fetchNotificationsRequest,
  fetchNotificationsCancel,
  closeNotificationDrawer,
  checkNotification
} from '@data/actions/notification'

const TemporaryDrawer = () => {
  const { notifications, fetchError, fetching, isDrawerOpen } = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotificationsRequest())
    return () => {
      dispatch(fetchNotificationsCancel())
    }
  }, [])

  const handleDrawerClose = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    dispatch(closeNotificationDrawer())
  }

  const handleNotificationCheck = (id, event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      dispatch(checkNotification(id))
    }
  }

  const nonCheckedNotifications = notifications => notifications.filter(notification => !notification.isChecked)

  const drawerContent = (fetching && <Spinner />) ||
    (nonCheckedNotifications(notifications).length === 0 &&
      <Box pt={3} align='center'>
        <Typography variant='overline'>
          Brak nowych notyfikacji
        </Typography>
      </Box>) ||
        <TemporaryDrawerList
          notifications={nonCheckedNotifications(notifications)}
          handleNotificationCheck={handleNotificationCheck}
        />

  if (fetchError) {
    return <Page404 />
  }

  return (
    <div>
      <Drawer anchor='right' open={isDrawerOpen} onClose={handleDrawerClose()}>
        <Box py={1} px={3} align='center'>
          <Typography variant='overline'>
            <Link href='/notifications'>
            Zobacz historię notyfikacji
            </Link>
          </Typography>
        </Box>
        <Divider />
        {drawerContent}
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer
