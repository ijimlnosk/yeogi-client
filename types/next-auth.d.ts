import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string // Add accessToken to Session
    }

    interface Token {
        accessToken?: string // Add accessToken to Token
    }
}
