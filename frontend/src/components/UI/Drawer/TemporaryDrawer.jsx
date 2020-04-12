import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNotificationsRequest, fetchNotificationsCancel, closeNotificationDrawer } from '@data/actions/notification'
import TemporaryDrawerList from './TemporaryDrawerList.jsx'
import Drawer from '@material-ui/core/Drawer'
import Spinner from '../Spinner'
import Page404 from '../Page404'

const TemporaryDrawer = () => {
  const dispatch = useDispatch()
  const { notifications, fetchError, fetching, isDrawerOpen } = useSelector((state) => state.notification)

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

  if (fetchError) {
    return <Page404 />
  }

  return (
    <div>
      <Drawer anchor='right' open={isDrawerOpen} onClose={handleDrawerClose()}>
        {
          fetching ? <Spinner />
            : <TemporaryDrawerList notifications={notifications} />
        }
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer
