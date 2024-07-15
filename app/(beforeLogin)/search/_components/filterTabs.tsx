import ContinentFilterTabs from "./continentFilter"
import ThemeFilterTabs from "./themeFilter"

const FilterTabs = () => {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center rounded-md">
            <ContinentFilterTabs />
            <ThemeFilterTabs />
        </div>
    )
}
export default FilterTabs
