import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import actionTypes from '../common/constants/actionTypes';
import SampleCard from '../components/SampleCard';
import AboutMarta from '../components/AboutMarta';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.HOME_LOADED_ACTION });
  }, []);
  return (
    <div>
      <AboutMarta />
    </div>
  );
}
