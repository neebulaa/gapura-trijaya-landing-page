import { Route, Routes } from 'react-router-dom'
import BackOfficeLayout from '@/components/Layout/BackOfficeLayout'
import Dashboard from '@/pages/App/Dashboard'

export default function BackRoute() {
    return (
        <Routes>
            <Route path="/app" element={<BackOfficeLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}
