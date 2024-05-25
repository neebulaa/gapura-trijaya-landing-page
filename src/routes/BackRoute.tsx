import { Route, Routes } from 'react-router-dom'
import BackOfficeLayout from '@/components/Layout/BackOfficeLayout'
import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading'

const Dashboard = lazy(() => import('@/pages/App/Dashboard'))

export default function BackRoute() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<BackOfficeLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="*" element={<h1>Not Found</h1>}></Route>
                </Route>
            </Routes>
        </Suspense>
    )
}
