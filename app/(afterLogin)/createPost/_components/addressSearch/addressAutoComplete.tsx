import { useEffect, useRef } from "react"
import { AddressAutoCompleteProps } from "./type"

const AddressAutoComplete = ({ onSelect }: AddressAutoCompleteProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement("script")
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`
            script.async = true
            script.defer = true
            document.head.appendChild(script)
        }

        const initializeAutocomplete = () => {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current!)
            autoCompleteRef.current.addListener("place_changed", onPlaceChanged)
        }

        if (window.google && window.google.maps && window.google.maps.places) {
            initializeAutocomplete()
        } else {
            window.initAutoComplete = initializeAutocomplete
            loadScript()
        }
    }, [])

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
            <input
                type="text"
                ref={inputRef}
                placeholder="주소를 입력하세요"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
        </div>
    )
}

export default AddressAutoComplete
