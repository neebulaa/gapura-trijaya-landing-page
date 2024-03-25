import Hero from "./page-parts/Hero";
import Benefits from "./page-parts/Benefits";
import Products from "./page-parts/Products";
import Membership from "./page-parts/Membership";
import OrderSteps from "./page-parts/OrderSteps";
import About from "./page-parts/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Benefits />
			<Products />
			<Membership />
			<OrderSteps />
			<About />
			<Footer />
		</>
	);
}

export default App;
