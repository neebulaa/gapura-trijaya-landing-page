import Hero from "../page-parts/home/Hero";
import Benefits from "../page-parts/home/Benefits";
import Products from "../page-parts/home/Products";
import Membership from "../page-parts/home/Membership";
import OrderSteps from "../page-parts/home/OrderSteps";
import About from "../page-parts/home/About";
import Testimonial from "../page-parts/home/Testimonial";
export default function Home() {
	return (
		<>
			<Hero />
			<Benefits />
			<Products />
			<Testimonial />
			<Membership />
			<OrderSteps />
			<About />
		</>
	);
}
