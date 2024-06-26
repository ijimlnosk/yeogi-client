"use client"

import { useEffect, useRef } from "react"
import { MapDivProps } from "./type"

/**
 * MapDiv Component
 *
 * @param {MapDivProps} props
 * @param {Location} props.location - 지도 위치를 표시
 * {
 *      lat: number -> 위도,
 *      lng: number -> 경도
 * }
 * @returns
 */
const MapDiv = ({ location }: MapDivProps) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)

    useEffect(() => {
        if (location && window.google && window.google.maps) {
            const mapDiv = mapRef.current
            if (mapDiv) {
                if (!mapInstance.current) {
                    mapInstance.current = new google.maps.Map(mapDiv, {
                        zoom: 18,
                        center: location,
                    })
                    new google.maps.Marker({
                        position: location,
                        map: mapInstance.current,
                    })
                } else {
                    mapInstance.current.setCenter(location)
                    new google.maps.Marker({
                        position: location,
                        map: mapInstance.current,
                    })
                }
            }
        }
    }, [location])

    return <div ref={mapRef} className="w-full h-[500px]"></div>
}

export default MapDiv
