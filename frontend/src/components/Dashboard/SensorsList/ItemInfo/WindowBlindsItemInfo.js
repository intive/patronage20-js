import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

export default function WindowBlindsItemInfo ({ sensorData, classes, handleRemoveClick }) {
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={
          <div className={classes.item}>
            {sensorData.position}
            <IconButton
              className={classes.close}
              onClick={() => handleRemoveClick(true)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        }
      />
    </ListItemSecondaryAction>
  )
}
