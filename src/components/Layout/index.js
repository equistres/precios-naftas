import React, { Fragment } from 'react';
import Map from '../Map';
import '../styles/index.css';

export default ({ customHooks }) => {
  return (
  <Fragment>
    <header><img src="/images/icon.png" alt="naftas.com.ar"/></header>
    <Map customHooks={customHooks} />
  </Fragment>)
}

