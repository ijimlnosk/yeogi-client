import { getPins } from "@/apis/mapApi"
import { Pin } from "@/apis/type"
import { useQuery } from "@tanstack/react-query"

export const usePinsQuery = () => {
    return useQuery<Pin[], Error>({
        queryKey: ["pins"],
        queryFn: getPins,
    })
}
