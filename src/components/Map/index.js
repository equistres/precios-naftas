import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerContainer from './MarkerContainer';
import MarkerInfo from './MarkerInfo';
import MarkerComponent from './MarkerComponent';
import MapStyles from './MapStyles';
import useMedia from 'use-media';
import { logoConfig, checkboxes } from '../../static/common-configs';

const SimpleMap = props =>{
    
    const { data, initialValues, setInitialValues } = props; 

    const isMobile = !useMedia({minWidth: 1000});
    const heightMobile = isMobile ? { height: 'calc(100vh - 90px)', width: '100%', textAlign:'center' }:{ height: 'calc(100vh - 57px)', width: '100%', textAlign:'center' };
    const defaults = isMobile ? { center: { lat: -34.6325668, lng: -58.4009859 }, defaultZoom: 14, maxZoom:16.5, minZoom:14, selectedItem:0 } : { center: { lat: -34.6325668, lng: -58.4009859 }, defaultZoom: 15, maxZoom:16.5, minZoom:14, selectedItem:0 };
    const [defaultProps, setDefaultProps] = useState(defaults);
    
    const handleClickOpenInfo = (data) =>{
        setDefaultProps({
            ...defaultProps,
            center: { lat: parseFloat(data.lat), lng: parseFloat(data.lon) },
            selectedItem: parseInt(data.idempresa)
        });        
    };
    const handleClickCloseInfo = (data) =>{
      setDefaultProps({
          ...defaultProps,
          center: { lat: parseFloat(data.lat), lng: parseFloat(data.lon) },
          selectedItem: 0
      });  
    };
    const handleClickChangeType = (id) =>{
        document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
            checkbox.checked = false;
        });

        const checked = document.querySelector(`input[type='checkbox'][value='${id}']`);
        checked.checked = true;
        setInitialValues({ url: `https://preciosensurtidor.minem.gob.ar/ws/rest/rest/server.php?method=getEmpresasAgrupadasBanderasCombustible&combustible=${id}&bounds={"so":{"lat":-34.67562659242818,"lng":-58.532635474890164},"ne":{"lat":-34.558088297983694,"lng":-58.24716260501712}}&banderas=["26","24","20","28","4","2"]` })
    }
    
    let offerMarkers;
    if(data && data.resultados){
        const { resultados } = data;
        offerMarkers = resultados.map(station => {
            const showItem = parseInt(defaultProps.selectedItem)===parseInt(station.idempresa) ? true : false;
            const logo = logoConfig[station.idempresabandera] ? logoConfig[station.idempresabandera] : '/images/generico.png';
            return(
                    <MarkerContainer 
                        key={station.idempresa}
                        lat={station.lat}
                        lng={station.lon}
                    >
                        <MarkerComponent
                            data={station}
                            handleClickOpenInfo={handleClickOpenInfo}
                        />
                        { showItem && 
                            <MarkerInfo 
                                data={station} 
                                handleClickCloseInfo={handleClickCloseInfo} 
                                isMobile={isMobile}
                                logo={logo}
                            /> 
                        }
                    </MarkerContainer>
            )
        });
    }
    return(
        <div style={heightMobile}>
            <div className="menuContainer">
                <div className="menu">
                    <div>Tipo de Combustible</div>
                    {
                        checkboxes.map((checkbox, key) => {
                            const checked = parseInt(checkbox.key)===parseInt(initialValues.id) ? true : false;
                            return(
                                <div className="fuelType" key={key}>
                                    {checkbox.label}<br/>
                                    <input type="checkbox" id={checkbox.name} name={checkbox.name} value={checkbox.key} defaultChecked={checked} onClick={()=>{handleClickChangeType(checkbox.key)}} />  
                                </div>
                            )
                        })
                    }   
                </div>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyDfedLs3_WIi4ykM-8wfkUmOnrfmsb8hGM'
                }}
                defaultZoom={defaultProps.defaultZoom}
                options = {{maxZoom:defaultProps.maxZoom, minZoom:defaultProps.minZoom, gestureHandling:'greedy', styles:MapStyles}}
                center={defaultProps.center}
            >
                {offerMarkers}
            </GoogleMapReact>
            
        </div>
    )
}
export default SimpleMap;