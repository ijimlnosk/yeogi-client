"use client"

import { useEffect, useRef, useState } from "react"
import { AddressAutoCompleteProps } from "./type"
import "@/styles/google-search.css"
import { removeCountryAddress } from "./address.util"
import { initializeAutocomplete, loadGoogleMapsScript } from "@/utils/googleMapsUtils"

/**
 * @Component
 *
 * 주소 자동 완성 기능
 *
 * @param {AddressAutoCompleteProps} props
 * @param {function} props.onSelect - 주소를 선택했을 때 호출되는 함수, 선택된 위치를 인수로 받는다
 * @returns
 */
const AddressAutoComplete = ({ onSelect }: AddressAutoCompleteProps) => {
    // 주소 input의 참조 저장
    const inputRef = useRef<HTMLInputElement>(null)

    // Google Places Autocomplete 인스턴스 저장
    const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])

    useEffect(() => {
        // 구글 맵이 이미 로드 되어있으면 즉시 초기화
        if (window.google && window.google.maps && window.google.maps.places) {
            initializeAutocomplete(inputRef, setPredictions)
        } else {
            // 구글 맵이 아직 로드되지 않은 경우 로드 후 초기화
            window.initAutoComplete = () => initializeAutocomplete(inputRef, setPredictions)
            loadGoogleMapsScript(() => {
                window.initAutoComplete()
            })
        }
    }, [])

    const handleSelectPrediction = (placeId: string, description: string) => {
        const placesService = new google.maps.places.PlacesService(document.createElement("div"))
        placesService.getDetails({ placeId, language: "ko" }, place => {
            if (place && place.geometry && place.geometry.location) {
                const removeCountry = removeCountryAddress(description)
                const location = {
                    formatted_address: removeCountry,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }
                onSelect(location)
            }
        })
    }

    return (
        <div className="w-[400px]">
            <input
                type="text"
                ref={inputRef}
                placeholder="주소를 입력하세요"
                className="w-full px-2 border-2 outline-none"
            />
            <ul className="autocomplete-results">
                {predictions.map(prediction => (
                    <li
                        key={prediction.place_id}
                        onClick={() => handleSelectPrediction(prediction.place_id, prediction.description)}
                        className=" hover:text-BRAND-50 hover:cursor-pointer p-2"
                    >
                        {removeCountryAddress(prediction.description)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AddressAutoComplete
