import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import FrontLayout from '../components/Layout/FrontLayout'
import Landing from '../pages/Landing'

export default function FrontRoute() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const [openCurrentEvent, setOpenCurrentEvent] = useState(false)

    return (
        <Routes>
            <Route path="/" element={<FrontLayout />}>
                <Route index element={<Landing />} />
                {/* <Route path="about" element={<About />} /> */}
                {/* <Route path="*" element={<NoMatch />} /> */}
            </Route>
        </Routes>
    )
}
