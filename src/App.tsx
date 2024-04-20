import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Routes, Route } from "react-router-dom";
import ShopProductDetail from "./pages/ShopProductDetail";
import NotFound from "./pages/NotFound";

function App() {
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
					<Route path="/shop">
						<Route index element={<Shop />} />
						<Route path=":category">
							<Route index element={<Shop />} />
							<Route path=":category_type">
								<Route index element={<Shop />} />
								<Route
									path=":slug"
									element={<ShopProductDetail />}
								/>
							</Route>
						</Route>
					</Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</section>
			<Footer />
		</>
	);
}

export default App;
