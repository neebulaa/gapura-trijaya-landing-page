import BackRoute from '@/routes/BackRoute'
import FrontRoute from '@/routes/FrontRoute'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <>
            <Routes>
                <Route path="/*" element={<FrontRoute />} />
                <Route path="/app/*" element={<BackRoute/>} />
            </Routes>
        </>
    )
}

export default App
