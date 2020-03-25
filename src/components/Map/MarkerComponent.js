import React from 'react'

export default function MarkerComponent({data, logo, handleClickOpenInfo}) {
const precios = Object.values(data.precios)[0];
    debugger;
    return (
        <section onClick={()=>{handleClickOpenInfo(data)}}>
            <div className="markerComponent">
                <img src={logo}/>
                <b>{precios.precio}</b>
            </div>
        </section>
    )
}
