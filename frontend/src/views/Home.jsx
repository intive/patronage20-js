import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import actionTypes from '../common/constants/actionTypes'
import SampleCard from '../components/SampleCard'
import { Link } from 'react-router-dom'

export default function Home () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: actionTypes.HOME_LOADED_ACTION })
  }, [])
  return (
    <div>
      <h1>Patronage 2020 JS!</h1>
      <SampleCard />
      <Link to='/karol'>Karol</Link>
    </div>
  )
}
