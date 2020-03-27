import React from 'react'

export default function MarkerComponent({data, logo, handleClickOpenInfo}) {
    const precios = Object.values(data.precios)[0];
    return (
         <section onClick={()=>{handleClickOpenInfo(data)}}>
             <div className="markerComponent">
                 <div className="price">{precios.precio}</div>
             </div>
         </section>


    )
}
//<section onClick={()=>{handleClickOpenInfo(data)}}>
//<div className="markerComponent">
//    <img alt="logo" src={logo}/>
//    <b>{precios.precio}</b>
//</div>
//</section>