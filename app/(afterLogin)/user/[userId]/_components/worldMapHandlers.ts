import { HandleMapClickProps } from "./type"

export const handleMapClick = ({
    e,
    editable,
    isUpdate,
    pinCount,
    movingPins,
    pins,
    setSelectedPin,
    setPins,
    setMovingPins,
    setPinCount,
}: HandleMapClickProps) => {
    if (!editable && !isUpdate) {
        setSelectedPin(null)
        return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (pinCount > 0 && movingPins.length) {
        const movingPin = movingPins[0]
        const updatedPin = { ...movingPin, pin: { x, y } }
        setPins([...pins, updatedPin])
        setMovingPins(movingPins.slice(1))
        setPinCount(pinCount - 1)
    } else if (editable) {
        const pinIndex = pins.findIndex(p => Math.abs(p.pin.x - x) < 1 && Math.abs(p.pin.y - y) < 1)
        if (pinIndex !== -1) {
            setPins(pins.map((pin, idx) => (idx === pinIndex ? { ...pin, pin: { x, y } } : pin)))
        }
    }
}

export const toggleUpdateMode = (isUpdate: boolean, setIsUpdate: (update: boolean) => void) => {
    setIsUpdate(!isUpdate)
}
