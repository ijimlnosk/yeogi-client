import { Pin } from "@/apis/type"

/**
 * 구글 맵 JS API 스크립트를 동적 로드
 *
 * @function
 * @param {() => void} callback
 */
export const loadGoogleMapsScript = (callback: () => void) => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=ko&callback=initAutocomplete$`
    script.async = true
    script.defer = true
    script.onload = callback
    document.head.appendChild(script)
}

/**
 * Google Places Autocomplete 서비스를 초기화하고,
 * 입력 값의 변화에 따라 자동 완성 예측을 설정합니다.
 *
 * @function
 * @param {React.RefObject<HTMLInputElement>} inputRef
 * @param {React.Dispatch<React.SetStateAction<google.maps.places.AutocompletePrediction[]>>} setPredictions - 자동 완성 예측 결과를 설정하기 위한 상태 설정 함수.
 */
export const initializeAutocomplete = (
    inputRef: React.RefObject<HTMLInputElement>,
    setPredictions: React.Dispatch<React.SetStateAction<google.maps.places.AutocompletePrediction[]>>,
) => {
    const autocompleteService = new google.maps.places.AutocompleteService()
    const handleInputChange = async () => {
        const input = inputRef.current?.value || ""
        if (input) {
            autocompleteService.getPlacePredictions({ input, language: "ko" }, predictions => {
                setPredictions(predictions || [])
            })
        }
    }
    inputRef.current?.addEventListener("input", handleInputChange)
}

/**
 * 지도 핀을 Number로 변환하는 함수
 *
 * @param pin
 * @returns
 */
export const calculatePinPosition = (pin: Pin) => {
    const xPercent = Number(pin.x)
    const yPercent = Number(pin.y)
    return { xPercent, yPercent }
}
