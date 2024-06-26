import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
        return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        )

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch geocode" }, { status: 400 })
        }

        const data = await response.json()

        if (data.status !== "OK") {
            return NextResponse.json({ error: "Failed to fetch geocode" }, { status: 400 })
        }

        const location = data.results[0].geometry.location

        return NextResponse.json({ location })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
