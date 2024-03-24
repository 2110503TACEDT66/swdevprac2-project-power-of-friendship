'use client'

import { APIProvider,Map,AdvancedMarker,Pin,InfoWindow } from "@vis.gl/react-google-maps"
import { useState } from "react"

export default function GoogleMap({Llat,Llng}:{Llat:number,Llng:number}){
    const position = {lat:Llat, lng: Llng}

    return (
        <APIProvider apiKey="AIzaSyD_7CKN7QIjeCTb6LzTnWh7eF4yrku3CPQ">
            <div style={{ height : "60vh", width : "50%"}}>
                <Map zoom={17} center={position} mapId="ae0811f56aa78742">
                    <AdvancedMarker position={position}>
                        <Pin></Pin>
                    </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}