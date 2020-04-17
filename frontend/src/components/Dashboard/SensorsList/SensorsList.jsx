import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Grid } from '@material-ui/core'
import Item from './Item.jsx'
import { useWindowSize } from 'react-use'

import { refreshSensors } from '@data/actions/sensor'

const useStyles = makeStyles((theme) => ({
  root: props => ({
    width: '100%',
    height: props.sidebarHeight + 'px',
    backgroundColor: theme.palette.background.level2
  }),
  list: {
  }
}))

function drawItems (sensors, disabled) {
  return (Object.keys(sensors).map((keyName) => {
    return (sensors[keyName].map(sensorData => {
      return (
        <Item
          disabled={disabled}
          sensorData={sensorData}
          key={sensorData.id}
          sensorType={keyName}
        />
      )
    }))
  }))
}

const divideSensors = (sensors) => {
  const connectedSensors = {}
  const notConnectedSensors = {}
  for (const key in sensors) {
    connectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition !== undefined)
    notConnectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition === undefined)
  }

  return { connectedSensors, notConnectedSensors }
}

export default function SensorsList () {
  const { t } = useTranslation()

  const { height } = useWindowSize()
  const sidebarHeight = height - 64
  const classes = useStyles({ sidebarHeight })

  const dispatch = useDispatch()
  useEffect(() => {
    const interval = setInterval(function () { dispatch(refreshSensors()) }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const {
    connectedSensors, notConnectedSensors
  } = useSelector((state) => {
    return divideSensors(state.sensor.sensors)
  })

  return (
    <Grid
      item xs={3}
      className={classes.root}
      data-testid='sensors-list'
      style={{ overflow: 'auto' }}
    >
      <List
        className={classes.list}
        data-testid='not-connected-sensors-list'
        subheader={<ListSubheader>{t('dashboard:sensors-not-placed')}</ListSubheader>}
      >
        {drawItems(notConnectedSensors, false)}
      </List>
      <List
        className={classes.list}
        data-testid='connected-sensors-list'
        subheader={<ListSubheader>{t('dashboard:sensors-placed')}</ListSubheader>}
      >
        {drawItems(connectedSensors, true)}
      </List>
    </Grid>
  )
}
