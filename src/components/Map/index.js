import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerContainer from './MarkerContainer';
import MarkerInfo from './MarkerInfo';
import MarkerComponent from './MarkerComponent';
import MapStyles from './MapStyles';
import useMedia from 'use-media';
import { logoConfig, checkboxes } from '../../static/common-configs';

const SimpleMap = ({ customHooks }) => {
    
    const isMobile = !useMedia({minWidth: 1000});
    const heightMobile = isMobile ? { height: 'calc(100vh - 90px)', width: '100%', textAlign:'center' }:{ height: 'calc(100vh - 95px)', width: '100%', textAlign:'center' };
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
        customHooks.setInitialValues({ url: `https://preciosensurtidor.minem.gob.ar/ws/rest/rest/server.php?method=getEmpresasAgrupadasBanderasCombustible&combustible=${id}&bounds={"so":{"lat":-34.67562659242818,"lng":-58.532635474890164},"ne":{"lat":-34.558088297983694,"lng":-58.24716260501712}}&banderas=["26","24","20","28","4","2"]` })
        customHooks.setLoading(true)
    }
    
    let offerMarkers;
    if(customHooks && customHooks.data && customHooks.data.resultados){
        const { resultados } = customHooks.data;
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
                    <div>COMBUSTIBLE</div>
                    {
                        checkboxes.map((checkbox, key) => {
                            const checked = parseInt(checkbox.key)===parseInt(customHooks.initialValues.id) ? true : false;
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
            { customHooks.loading && <div id="loading"><img src="/images/loading.gif" alt="loading"/></div> }
            >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyDfedLs3_WIi4ykM-8wfkUmOnrfmsb8hGM'
                }}
                defaultZoom={defaultProps.defaultZoom}
                options = {{maxZoom:defaultProps.maxZoom, minZoom:defaultProps.minZoom, gestureHandling:'greedy', styles:MapStyles, fullscreenControl:false, zoomControl:false}}
                center={defaultProps.center}
            >
                {offerMarkers}
            </GoogleMapReact>
            
        </div>
    )
}
export default SimpleMap;