import PageHeader from "../components/PageHeader";
import CartData from "../assets/data/cart.json";
import { useMemo } from "react";
import { formatCurrencyRupiah } from "../utils/formatCurrency";
import IconMinus from "../assets/icons/IconMinus";
import IconPlus from "../assets/icons/IconPlus";
import IconCoupon from "../assets/icons/IconCoupon";
import useLocalStorage from "../hooks/useLocalStorage";
import {Link} from 'react-router-dom';

export default function Checkout() {
	const [cart, setCart] = useLocalStorage("shopping-cart", CartData);
	const shipping = 0;
	const cartSubTotal = useMemo(() => {
		return cart.reduce((acc, c) => acc + c.subtotal, 0);
	}, [cart]);
	const total = cartSubTotal + shipping;

	function removeCartItem(id: number | string) {
		setCart((prev) => prev.filter((c) => c.id != id));
	}

	function incrementQuantity(id: number | string) {
		setCart((prev) =>
			prev.map((c) =>
				c.id == id
					? {
							...c,
							quantity: c.quantity + 1,
					  }
					: c
			)
		);
	}

	function decrementQuantity(id: number | string) {
		let item = cart.find((c) => c.id == id);
		if (item && item.quantity - 1 == 0) {
			setCart((prev) => prev.filter((c) => c.id != id));
			return;
		}

		setCart((prev) =>
			prev.map((c) =>
				c.id == id
					? {
							...c,
							quantity: c.quantity - 1,
					  }
					: c
			)
		);
	}

	return (
		<>
			<PageHeader
				title="Checkout"
				navigations={["Home", "Shopping Cart", "Checkout"]}
			/>
			<section className="container" id="shopping-cart">
				
			</section>
		</>
	);
}
