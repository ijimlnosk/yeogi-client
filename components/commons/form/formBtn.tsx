import React from "react"

const FormBtn = () => {
    return (
        <div className="flex justify-end space-x-4">
            <button className="bg-gray-400 text-white p-2 rounded-md">임시저장</button>
            <button className="bg-black text-white p-2 rounded-md">기록 올리기</button>
        </div>
    )
}

export default FormBtn
