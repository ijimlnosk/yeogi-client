"use client"

import { NextPageContext } from "next"

type ErrorProps = {
    statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
    let errorMessage = "어머, 에러가 발생했어요!"

    if (statusCode) errorMessage = `어머, ${statusCode} 에러가 발생했어요!`

    return (
        <div>
            <h1>ErrorCode : {statusCode}</h1>
            <p>{errorMessage}</p>
        </div>
    )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default ErrorPage
