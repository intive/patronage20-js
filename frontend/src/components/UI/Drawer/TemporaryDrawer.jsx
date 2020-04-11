import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
// import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import mockNotifications from '../../../data/api/notification/mockNotifications'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

const TemporaryDrawer = () => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    open: true
  })

  const toggleDrawer = (open) => (event) => {
    console.log(mockNotifications)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, open: open })
  }

  const list = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {mockNotifications.map((notification) => (
          <ListItem button key={notification.id}>
            <ListItemText primary={notification.id} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <Drawer anchor='right' open={state.open} onClose={toggleDrawer(false)}>
        {list('right')}
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer
