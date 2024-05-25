import Loading from '@/components/Loading'
import GuestRoute from '@/components/Route/GuestRoute'
import PrivateRoute from '@/components/Route/PrivateRoute'
import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

const FrontLayout = lazy(() => import('@/components/Layout/FrontLayout'))
const Home = lazy(() => import('@/pages/Home'))
const Shop = lazy(() => import('@/pages/Shop'))
const Contact = lazy(() => import('@/pages/Contact'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const MyPoin = lazy(() => import('@/pages/MyPoin'))
const ShoppingCart = lazy(() => import('@/pages/ShoppingCart'))
const CheckoutMain = lazy(() => import('@/pages/Checkout/CheckoutMain'))
const CheckoutBillingInformation = lazy(
    () => import('@/pages/Checkout/CheckoutBillingInformation')
)
const CheckoutDelivery = lazy(() => import('@/pages/Checkout/CheckoutDelivery'))
const CheckoutPayment = lazy(() => import('@/pages/Checkout/CheckoutPayment'))
const CheckoutSuccess = lazy(() => import('@/pages/Checkout/CheckoutSuccess'))

export default function FrontRoute() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<FrontLayout />}>
                    {/* <Route index element={<Landing />} /> */}
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />}></Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/my-poin" element={<MyPoin />}></Route>
                        <Route path="/cart" element={<ShoppingCart />}></Route>
                        <Route path="/checkout" element={<CheckoutMain />}>
                            <Route
                                path="/checkout/billing-information"
                                element={<CheckoutBillingInformation />}
                            ></Route>
                            <Route
                                path="/checkout/delivery"
                                element={<CheckoutDelivery />}
                            ></Route>
                            <Route
                                path="/checkout/payment"
                                element={<CheckoutPayment />}
                            ></Route>
                            <Route
                                path="/checkout/success"
                                element={<CheckoutSuccess />}
                            ></Route>
                        </Route>
                    </Route>

                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Route>

                    <Route path="*" element={<NotFound />}></Route>
                </Route>
            </Routes>
        </Suspense>
    )
}
