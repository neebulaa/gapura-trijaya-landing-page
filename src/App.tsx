import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Routes, Route, useLocation } from "react-router-dom";
import ShopProductDetail from "./pages/ShopProductDetail";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
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
					<Route path="/about" element={<About />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="/cart" element={<ShoppingCart />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</section>
			<Footer />
		</>
	);
}

export default App;
