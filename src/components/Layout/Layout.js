import React, { Fragment } from 'react';
import Map from '../Map';
import '../styles/index.css';

export default ({ data, id }) => {
  return (
  <Fragment>
    <header style={{height:'40px', backgroundColor:'#fff000'}}>header</header>
    <Map data={data} id={id}/>
  </Fragment>)
}