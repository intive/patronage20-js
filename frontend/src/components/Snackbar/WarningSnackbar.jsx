
import React from 'react'
import { Button, IconButton, Snackbar, SnackbarContent, Slide } from '@material-ui/core'
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

const TransitionDown = props => <Slide {...props} direction='down' />

const WarningSnackbar = (props) => {
  const [open, setOpen] = React.useState(false)
  const [transition, setTransition] = React.useState(undefined)
  const classes = useStyles()

  const handleClick = Transition => () => {
    setTransition(() => Transition)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ position: 'fixed', backgroundColor: '#444aaa', width: 100, height: 100 }}>
      <Button onClick={handleClick(TransitionDown)}>Down</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          className={classes.warning}
          message={
            <span className={classes.message} id='client-snackbar'>
              <Warning className={classes.icon} />
            WTF
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
    </div>
  )
}

export default WarningSnackbar
