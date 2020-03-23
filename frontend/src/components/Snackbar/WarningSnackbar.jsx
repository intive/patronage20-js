
import React, { useEffect } from 'react'
import axios from 'axios'
import { Snackbar, SnackbarContent, Slide, IconButton } from '@material-ui/core'
import { Warning, Close } from '@material-ui/icons'
import { amber } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const WarningSnackbar = () => {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles()

  const checkConnection = () => {
    if (!navigator.onLine) {
      setOpen(true)
    } else {
      axios.get('/.well-known/health-check', { timeout: 5000 })
        .then(() => {
          setOpen(false)
        })
        .catch((error) => {
          error.response.status === 408
            ? setOpen(true)
            : console.error(error)
        })
    }
  }

  useEffect(() => {
    checkConnection()
    setInterval(checkConnection, 10000)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      data-testedid='snackbar'
      open={open}
      TransitionComponent={(props) => <Slide {...props} direction='down' />}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <SnackbarContent
        className={classes.warning}
        message={
          <span className={classes.message} id='client-snackbar'>
            <Warning className={classes.icon} />
            Hej, coś nie styka! Sprawdź połączenie!
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default WarningSnackbar
