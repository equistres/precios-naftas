import React, { Fragment } from 'react';
import Map from '../Map';
import '../styles/index.css';

export default ({ data, initialValues, setInitialValues }) => {
  return (
  <Fragment>
    <header><img src="/images/icon.png" alt="naftas.com.ar"/></header>
    <Map data={data} initialValues={initialValues} setInitialValues={setInitialValues}/>
  </Fragment>)
}

