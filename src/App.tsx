import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import MyPoin from "./pages/MyPoin";
import Contact from "./pages/Contact";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ShopProductDetail from "./pages/ShopProductDetail";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import ShoppingCart from "./pages/ShoppingCart";
import CheckoutMain from "./pages/Checkout/CheckoutMain";
import CheckoutBillingInformation from "./pages/Checkout/CheckoutBillingInformation";
import CheckoutPayment from "./pages/Checkout/CheckoutPayment";
import CheckoutDelivery from "./pages/Checkout/CheckoutDelivery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import AppModal from "./components/AppModal";
import Profile from "./pages/Profile";
import ProfilePersonalInformation from "./pages/Profile/ProfilePersonalInformation";
import ProfileOrders from "./pages/Profile/ProfileOrders";
import ProfileSettings from "./pages/Profile/ProfileSettings";
import ProfileManageAddresses from "./pages/Profile/ProfileManageAddresses";

function App() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const [openCurrentEvent, setOpenCurrentEvent] = useState(true);

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
					marginTop: "100px", // this is how many pxs the fixed navbar is
				}}
			>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/shop" element={<Shop />} />
					<Route
						path="/shop/:category/:category_type/:slug"
						element={<ShopProductDetail />}
					/>
					<Route path="/my-poin" element={<MyPoin />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
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
					<Route element={<Profile />}>
						<Route
							path="/profile/personal-information"
							element={<ProfilePersonalInformation />}
						/>
						<Route
							path="/profile"
							element={
								<Navigate to="/profile/personal-information" />
							}
						/>
						<Route
							path="/profile/orders"
							element={<ProfileOrders />}
						/>
						<Route
							path="/profile/manage-addresses"
							element={<ProfileManageAddresses />}
						/>
						<Route
							path="/profile/settings"
							element={<ProfileSettings />}
						/>
					</Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</section>
			<Footer />
		</>
	);
}

export default App;
