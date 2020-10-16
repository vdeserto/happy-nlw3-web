import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'

import '../styles/pages/orphanages-map.css'
import api from '../services/api'


interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrphanagesMap(){
    // (FUNC, [VAR1, VAR2, ..., VARN]) QUANDO VAR1, VAR2 OU VARN FOR ALTERADO, A FUNÇÃO É EXECUTADA, PARA CHAMAR UMA UNICA VEZ O AXIOS.GET

    // VARIAVEL COMUM NAO EXIBE NOVO ORFANATO CRIADO, NAO USAR LET NEM CONST

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]) //desestructuring
    useEffect(() => {
        api.get('orphanages').then(res =>{
            setOrphanages(res.data)
            
        })
    }, []) 
    

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                
                <footer>
                    <strong>Campo Grande</strong>
                    <span>Mato Grosso do Sul</span>
                </footer>
            </aside>

            
                <Map 
                    center={[-20.4764967,-54.6204737]}
                    zoom={15}
                    style={{width: '100%', height: '100%'}}
                >

                    <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                
                {orphanages.map(orphanage =>{
                    return (
                        
                        <Marker 
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker> 
                    ) 

                    })
                }
             


                </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>

    )
}

export default OrphanagesMap;