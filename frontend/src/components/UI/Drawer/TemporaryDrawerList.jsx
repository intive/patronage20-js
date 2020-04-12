/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import TemporaryDrawerItem from './TemporaryDrawerItem.jsx'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

const TemporaryDrawerList = ({ notifications }) => {
  const classes = useStyles()

  return (
    <div
      className={classes.list}
      role='presentation'
    >
      <List>
        {notifications.map((notification) => (
          <TemporaryDrawerItem key={notification.id} notification={notification} />
        ))}
      </List>
    </div>
  )
}

export default TemporaryDrawerList
