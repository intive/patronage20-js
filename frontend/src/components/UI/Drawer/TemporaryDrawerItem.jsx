import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

const TemporaryDrawerItem = ({ notification }) => {
  const classes = useStyles()

  return (
    <ListItem button key={notification.id}>
      <ListItemText primary={notification.id} />
      <IconButton
        aria-label='close'
        color='inherit'
        className={classes.close}
      >
        <Close />
      </IconButton>
    </ListItem>
  )
}

export default TemporaryDrawerItem
