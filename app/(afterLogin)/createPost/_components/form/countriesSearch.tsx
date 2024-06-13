"use client"

import { useState } from "react"
import useCountrySearch from "@/hooks/useCountrySearch"
import CountrySearchBar from "./countrySearchBar"
import { countries } from "@/data/countries"
import Overlay from "@/components/commons/overlay"
import { CountrySearchProps } from "../type"
import Image from "next/image"
import backIcon from "@/public/icons/black_arrow_left.svg"

const CountriesSearch = ({ isOpen, onSelect }: CountrySearchProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const results = useCountrySearch({ countries, searchTerm })

    const handleCountryClick = (country: string) => {
        setSelectedCountry(country)
    }

    const handleSelectClick = () => {
        if (onSelect) {
            onSelect(selectedCountry)
        }
    }

    return (
        <Overlay isOpen={isOpen} onClick={handleSelectClick} text="선택완료" imageUrl="/icons/black_check.svg">
            <div className="bg-SYSTEM-white w-[448px] h-[397px] flex flex-col items-center rounded-2xl">
                <div className="w-full flex items-center justify-center relative">
                    <Image src={backIcon} alt="뒤로 가기" width={24} height={24} className="absolute left-6 top-6" />
                    <p className="text-sm py-6 ">국가 검색</p>
                </div>
                <CountrySearchBar text="여행 국가를 입력하세요" onChange={e => setSearchTerm(e.target.value)} />
                <div className=" py-5 overflow-y-scroll w-[400px] flex justify-center">
                    <ul className="flex flex-col">
                        {results.map((country, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleCountryClick(country.name)}
                                className={`w-[400px] py-3 flex items-center justify-center hover:cursor-pointer ${selectedCountry === country.name ? "text-BRAND-30" : ""}`}
                            >
                                {country.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Overlay>
    )
}
export default CountriesSearch
