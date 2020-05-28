import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  temperature: props => ({
    fontSize: props.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center'
  })
}))

export default function TemperatureSensorInner ({ temperature = 15 }) {
  temperature = temperature.toString()

  const getFontSize = temperature => {
    if (temperature.length === 6) {
      return '1.1vh'
    } else if (temperature.length === 5) {
      return '1.2vh'
    } else if (temperature.length === 4) {
      return '1.3vh'
    } else if (temperature.length === 3) {
      return '1.5vh'
    } else if (temperature.length === 2 || temperature.length === 1) {
      return '1.85vh'
    } else {
      return '0rem'
    }
  }

  const classes = useStyles({ fontSize: getFontSize(temperature) })

  return (
    <Typography className={classes.temperature}>
      {temperature}
    </Typography>
  )
}
