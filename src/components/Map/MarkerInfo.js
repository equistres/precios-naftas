import React from 'react'


export default function MarkerInfo({ data, handleClickCloseInfo, isMobile, logo }) {
    const address = data.direccion.split("(")[0];
    const query = `${address}+${data.localidad}`;

    return(
        <div className="markerInfo">
            <img src="/images/close-icon.png" alt="close buttom" className="closeButtom" onClick={()=>{handleClickCloseInfo(data)}}/>
            <p style={{margin: '-14px'}}><img alt="logo" src={logo}/></p>
            <p><strong>{data.razonsocial}</strong></p>
            <p>{data.direccion}</p>
            { isMobile && <p className="gMapsLink"><a href={`https://www.google.com/maps/search/?api=1&query=${query}`} rel="noopener noreferrer" target="_blank">Ver en Google Maps</a></p> }
        </div>
    );
}
