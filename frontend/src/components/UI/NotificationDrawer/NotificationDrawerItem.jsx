/* eslint-disable react/prop-types */
import React from 'react'
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import timeConverter from './timeConverter'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

const NotificationDrawerItem = ({ notification: { id, timestamp, isChecked }, handleNotificationCheck }) => {
  const classes = useStyles()

  const checkButton = !isChecked && (
    <ListItemSecondaryAction>
      <IconButton
        role='check-notification'
        aria-label='close'
        color='inherit'
        className={classes.close}
        onClick={event => handleNotificationCheck(id, event)}
        onKeyDown={event => handleNotificationCheck(id, event)}
      >
        <Close />
      </IconButton>
    </ListItemSecondaryAction>
  )
  return (
    <ListItem button key={id} data-testid='drawer-item'>
      <ListItemText primary={id} secondary={timeConverter(timestamp)} />
      {checkButton}
    </ListItem>
  )
}

export default NotificationDrawerItem
