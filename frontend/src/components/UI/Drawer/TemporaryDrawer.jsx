import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNotificationsRequest, fetchNotificationsCancel } from '@data/actions/notification'
import TemporaryDrawerList from './TemporaryDrawerList.jsx'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

const TemporaryDrawer = () => {
  const [state, setState] = useState({
    open: false
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotificationsRequest())
    return () => {
      dispatch(fetchNotificationsCancel())
    }
  }, [])

  const { notifications, fetchError, fetching, isDrawerOpen } = useSelector((state) => state.notification)

  const toggleDrawer = (open) => (event) => {
    console.log(notifications, fetchError, fetching, isDrawerOpen)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, open: open })
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>OPEN</Button>
      <Drawer anchor='right' open={state.open} onClose={toggleDrawer(false)}>
        <TemporaryDrawerList toggleDrawer={toggleDrawer} notifications={notifications} />
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer
