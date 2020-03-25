import React from 'react'


export default function MarkerInfo({ data, handleClickCloseInfo, isMobile }) {
    const address = data.direccion.split("(")[0];
    const query = `${address}+${data.localidad}`;

    return(
        <div className="infoWindow">
                <span className="closeButtom"
                onClick={()=>{handleClickCloseInfo(data)}}>
                    X
                </span>
            <p><strong>{data.razonsocial}</strong></p>
            <p>{data.direccion}</p>
            { isMobile && <p className="gMapsLink"><a href={`https://www.google.com/maps/search/?api=1&query=${query}`} rel="noopener noreferrer" target="_blank">Ver en Google Maps</a></p> }
        </div>
    );
}
