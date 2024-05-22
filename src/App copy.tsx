import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import MyPoin from './pages/MyPoin'
import Contact from './pages/Contact'
import { Routes, Route, useLocation } from 'react-router-dom'
import ShopProductDetail from './pages/ShopProductDetail'
import NotFound from './pages/NotFound'
import { useEffect, useState } from 'react'
import ShoppingCart from './pages/ShoppingCart'
import CheckoutMain from './pages/Checkout/CheckoutMain'
import CheckoutBillingInformation from './pages/Checkout/CheckoutBillingInformation'
import CheckoutPayment from './pages/Checkout/CheckoutPayment'
import CheckoutDelivery from './pages/Checkout/CheckoutDelivery'
import Login from './pages/Login'
import Register from './pages/Register'
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess'
import AppModal from './components/AppModal'
import PrivateRoute from './components/Route/PrivateRoute'
import GuestRoute from './components/Route/GuestRoute'
import Dashboard from './pages/App/Dashboard'

function App() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const [openCurrentEvent, setOpenCurrentEvent] = useState(false)

    return (
        <>
            {openCurrentEvent && (
                <AppModal
                    title="Special Event"
                    close={() => setOpenCurrentEvent(false)}
                >
                    <img
                        className="w-100"
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }./images/event.png`}
                        alt={`${import.meta.env.VITE_APP_NAME} - Event`}
                    />
                </AppModal>
            )}
            <Navbar />
            <section
                style={{
                    marginTop: '100px', // this is how many pxs the fixed navbar is
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/shop" element={<Shop />} />
                    <Route
                        path="/shop/:category/:slug"
                        element={<ShopProductDetail />}
                    />
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

                    <Route element={<GuestRoute />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        ></Route>
                        {/* <Route path="/checkout" element={<CheckoutMain />}>
                            <Route
                                path="/checkout/billing-information"
                                element={<CheckoutBillingInformation />}
                            ></Route>
                        </Route> */}
                    </Route>

                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </section>
            <Footer />
        </>
    )
}

export default App
