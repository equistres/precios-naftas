import React from 'react'

export default function MarkerComponent({data, logo, handleClickOpenInfo}) {
    let precios = Object.values(data.precios)[0].precio;
    precios = precios.toString().slice(0,5);
    
    return (
         <section onClick={()=>{handleClickOpenInfo(data)}}>
             <div className="markerComponent">
                 <div className="price">{precios}</div>
             </div>
         </section>


    )
}