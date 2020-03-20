import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import house from '@assets/house.svg'
import Sensor from '@components/Map/Sensor'
import MapModal from '@components/Map/MapModal'
import { loadSensors } from '@data/actions/sensor/sensorActions.js'
import {
  fromCoordinateToPercentMapper,
  fromPercentToCoordinateMapper,
  isFieldOccupied,
  validPointData
} from './helpers'

/** Defines how many times sensor is smaller than map. */
const SENSOR_COEFFICIENT = 50

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    top: '20px'
  },
  image: {
    cursor: 'cell',
    height: 'auto',
    width: 'auto',
    minWidth: '100%',
    maxHeight: 'calc(100vh - 250px)'
  },
  paper: {
    position: 'absolute',
    width: '400px',
    height: '150px',
    backgroundColor: 'white',
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    top: 50,
    fontSize: '20px',
    margin: '20% auto',
    padding: '10px',
    alignContent: 'center'
  },
  modalTitle: {
    padding: '15px 0'
  }
}))

const HomeMap = () => {
  const dispatch = useDispatch()
  const picRef = useRef(null)
  const classes = useStyles()
  const [points, addPoint] = useState([])
  const [mapHeight, setMapHeight] = useState(null)
  const [mapWidth, setMapWidth] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(loadSensors())
    }
  }, [dispatch])

  /**
   * Transfroms sensors from store to appropriate format.
   *
   * @returns {Array} array od sensors objects: { x: number, y: number }
   */
  const sensors = useSelector((state) => {
    const { sensors } = state.sensor
    return Object.keys(sensors).map(key => sensors[key]).flat().filter(sensor => sensor.mapPosition)
  })

  useEffect(() => {
    function handleResize () {
      if (picRef !== null && picRef.current !== null) {
        const { height, width } = picRef.current
        setMapHeight(height)
        setMapWidth(width)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /**
  * Adds point to array if possible.
  *
  * @param e Mouse click event.
  */
  const addNewSensor = (e) => {
    const { offsetX = 0, offsetY = 0 } = e.nativeEvent
    /** Offset defined in map's width in percent. */
    const xCoordinate = fromCoordinateToPercentMapper(
      offsetX - (mapWidth / SENSOR_COEFFICIENT / 2), mapWidth)
    /** Offset defined in map's height in percent. */
    const yCoordinate = fromCoordinateToPercentMapper(
      offsetY - (mapWidth / SENSOR_COEFFICIENT / 2), mapHeight)
    /** Sensors fetched from store and mapper to appropriate format. */
    const storeSensors = sensors
      .map((sensor) => Object.assign(sensor, { x: sensor.mapPosition.x, y: sensor.mapPosition.y }))

    /** Checks if point could be located in specific position on map. */
    if (isFieldOccupied(xCoordinate, yCoordinate, points.concat(storeSensors))) {
      setModalOpen(true)
      return
    }

    /** Adds point to state. */
    addPoint([...points, { x: xCoordinate, y: yCoordinate }])
  }

  /** Function sets starting map size after image loading. **/
  function setOnLoadMapSize () {
    const { height, width } = picRef.current
    setMapHeight(height)
    setMapWidth(width)
  }

  return (
    <div className={classes.container}>
      <img
        data-testid="image-id"
        ref={picRef}
        onClick={addNewSensor}
        src={house}
        alt="Home plan"
        className={classes.image}
        onLoad={setOnLoadMapSize}/>
      {
        sensors && sensors.concat(points
          .map(point => Object.assign(point, { mapPosition: { x: point.x, y: point.y } })))
          .map((point) => (
            validPointData(point) && <Sensor
              data-testid="sensor-id"
              key={`${point.mapPosition.x}${point.mapPosition.y}${Math.random}`}
              sensorSize={
                { width: mapWidth / SENSOR_COEFFICIENT, height: mapWidth / SENSOR_COEFFICIENT }
              }
              position={{
                top: fromPercentToCoordinateMapper(point.mapPosition.y, mapHeight),
                left: fromPercentToCoordinateMapper(point.mapPosition.x, mapWidth),
                position: 'absolute'
              }}
            />
          ))
      }
      <MapModal
        data-testid="modal-test-id"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Gap needed!"
        content="Leave a gap between sensors, please." />
    </div>
  )
}

export default HomeMap