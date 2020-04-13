import React from 'react'
import { ListItem, ListItemText, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

const TemporaryDrawerItem = ({ notification: { id }, handleNotificationCheck }) => {
  const classes = useStyles()

  return (
    <ListItem button key={id}>
      <ListItemText primary={id} />
      <IconButton
        aria-label='close'
        color='inherit'
        className={classes.close}
        onClick={event => handleNotificationCheck(id, event)}
        onKeyDown={event => handleNotificationCheck(id, event)}
      >
        <Close />
      </IconButton>
    </ListItem>
  )
}

export default TemporaryDrawerItem
