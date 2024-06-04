import Pagination from "@/components/commons/pagination"

export default function Home() {
    const totalPages = 8

    return (
        <div className="p-4">
            <h1 className="font-myeongjo text-title text-BRAND-50">
                This is the Nanum Myeongjo font with BRAND color.
            </h1>
            <Pagination totalPages={totalPages} />
        </div>
    )
}
