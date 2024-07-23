import { NavigateList } from "@/constants/navigateList"
import { usePathname, useRouter } from "next/navigation"

const HeaderNavigate = () => {
    const router = useRouter()
    const pathName = usePathname()

    return (
        <nav className="hidden md:block">
            <ul className="w-full h-20 2xl:ml-8 md:ml-4 flex justify-evenly items-center cursor-pointer">
                {NavigateList.map(({ title, path }) => (
                    <li
                        key={path}
                        onClick={() => router.push(path)}
                        className={`text-SYSTEM-black font-bold text-xs xl:text-sm w-fit px-6 py-8 md:px-3 ${pathName === path ? "border-b-2 border-SYSTEM-black" : ""}`}
                    >
                        {title}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default HeaderNavigate
