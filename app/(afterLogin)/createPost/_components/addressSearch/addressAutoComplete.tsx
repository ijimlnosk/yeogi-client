import { useEffect, useRef } from "react"
import { AddressAutoCompleteProps } from "./type"

/**
 * @Component
 *
 * 주소 자동 완성 기능
 *
 * @param {AddressAutoCompleteProps} props
 * @param {function} props.onSelect - 주소를 선택 했을 때 호출되는 함수, 선택된 위치를 인수로 받는다
 * @returns
 */
const AddressAutoComplete = ({ onSelect }: AddressAutoCompleteProps) => {
    // 주소 input의 참조 저장
    const inputRef = useRef<HTMLInputElement>(null)
    // Google Places Autocomplete 인스턴스 저장
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    useEffect(() => {
        // 구글 맵 JS API 스크립트를 동적 로드
        const loadScript = () => {
            const script = document.createElement("script")
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`
            script.async = true
            script.defer = true
            document.head.appendChild(script)
        }

        //Google Places Autocomplete를 초기화
        const initializeAutocomplete = () => {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current!)
            autoCompleteRef.current.addListener("place_changed", onPlaceChanged)
        }

        // 구글 맵이 이미 로드 되어있으면 즉시 초기화
        if (window.google && window.google.maps && window.google.maps.places) {
            initializeAutocomplete()
        } else {
            // 구글 맵이 아직 로드 되지 않은 경우 로드 후 초기화
            window.initAutoComplete = initializeAutocomplete
            loadScript()
        }
    }, [])

    /**
     * 주소를 선택했을 때 호출되는 콜백 함수
     * 선택된 정보를 부모로 전달
     * @returns
     */
    const onPlaceChanged = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace()
            if (!place.geometry || !place.geometry.location) {
                return
            }
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            }
            onSelect(location)
        }
    }

    return (
        <div className="w-[400px]">
            <input type="text" ref={inputRef} placeholder="주소를 입력하세요" className="w-full p-2 m-2.5" />
        </div>
    )
}

export default AddressAutoComplete
