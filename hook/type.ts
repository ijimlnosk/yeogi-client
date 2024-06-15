import { Country } from "@/app/(afterLogin)/createPost/_components/type"

export type CountryProps = {
    countries: Country[]
    searchTerm: string
}
export type DataProps = {
    accessToken: string;
    refreshToken: string;
};

export type SignInProps = {
    email: string
    password: string
}
