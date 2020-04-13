import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { openNotificationDrawer } from '../../../../data/actions/notification'
const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: '#334455',
    color: '#FFFFFF',
    margin: '0',
    height: '100%'
  },
  tabs: {
    borderTop: '1px white solid'
  }
}))

function LinkTab (props) {
  return (
    <Tab
      component='a'
      {...props}
    />
  )
}

function checkActive (url) {
  const sites = {
    '/': 0,
    '/hvac': 1,
    '/authors': 2
  }
  return sites[url] || 0
}

function notificationsNumber (notifications) {
  const nonCheckedNotifications = notifications.filter(notification => !notification.isChecked)
  return nonCheckedNotifications.length
}

export default function Header () {
  const myClasses = useStyles()
  const location = useLocation()

  const [value, setValue] = useState(checkActive(location.pathname))

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const { notifications } = useSelector((state) => state.notification)

  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    dispatch(openNotificationDrawer())
  }

  return (
    <Grid container className={myClasses.bar} data-testid='header-id'>
      <Grid item xs={12}>
        <Box display='flex' p={1}>
          <Box p={1} flexGrow={1} textAlign='left'>
            <Typography variant='h5'>
              Smart Home
            </Typography>
          </Box>
          <Box p={1}>
            <IconButton
              aria-label='notifications'
              color='inherit'
              onClick={handleDrawerOpen}
            >
              <Badge
                badgeContent={notificationsNumber(notifications)}
                overlap='circle'
                color='secondary'
              >
                <NotificationsIcon fontSize='large' />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} className={myClasses.tabs}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Navigation tabs'
        >
          <LinkTab label='Dashboard' href='/' data-testid='dashboard-tab-id' />
          <LinkTab label='HVAC' href='/hvac' />
          <LinkTab label='Autorzy' href='/authors' />
        </Tabs>
      </Grid>
    </Grid>
  )
}
