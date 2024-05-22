import React from "react"
import { Outlet } from "react-router-dom"

type FrontLayoutProps = {
    children?: React.ReactNode
}

export default function FrontLayout({ children }: FrontLayoutProps) {
    return (
        <>
            <header>
                <h1>Front Layout</h1>
            </header>
            <main>{children}</main>
            <Outlet/>
        </>
    )
}
