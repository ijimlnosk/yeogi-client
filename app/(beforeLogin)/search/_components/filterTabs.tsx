import ContinentFilterTabs from "./continentFilter"
import ThemeFilterTabs from "./themeFilter"

const FilterTabs = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center overflow-x-auto">
            <div className="min-w-max">
                <div className="w-full h-fit flex flex-col justify-center items-center rounded-md">
                    <div className="w-full overflow-x-auto">
                        <ContinentFilterTabs />
                    </div>
                    <div className="w-full flex justify-center overflow-x-auto">
                        <ThemeFilterTabs />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FilterTabs
