/* eslint-disable react/prop-types */
import React from 'react'
import List from '@material-ui/core/List'
import TemporaryDrawerItem from './TemporaryDrawerItem.jsx'

const TemporaryDrawerList = ({ notifications, handleNotificationCheck }) => {
  return (
    <div role='presentation'>
      <List>
        {notifications.map((notification) => (
          <TemporaryDrawerItem key={notification.id} notification={notification} handleNotificationCheck={handleNotificationCheck} />
        ))}
      </List>
    </div>
  )
}

export default TemporaryDrawerList
