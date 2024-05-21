import { ChangeEvent, useState } from "react";
import { ProductType } from "../../dto/ProductType";
import { formatCurrencyRupiah } from "../../utils/formatCurrency";
import IconMinus from "../../assets/icons/IconMinus";
import IconPlus from "../../assets/icons/IconPlus";
import IconBag from "../../assets/icons/IconBag";
import SuccessAddToCartPopup from "../../components/SuccessAddToCartPopup";
import useLocalStorage from "../../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";
import { CartItemType } from "../../dto/CartItemType";
import { AttributeType } from "../../dto/AttributeType";
import { CategoryType } from "../../dto/CategoryType";

type ShopPlakatDetailFormType = {
	product: ProductType & {
		attributes: AttributeType[];
	};
	category: CategoryType;
};

export default function ShopPlakatDetailForm({
	product,
	category,
}: ShopPlakatDetailFormType) {
	const [cart, setCart] = useLocalStorage<CartItemType[]>(
		"shopping-cart",
		[] as CartItemType[]
	);
	const [data, setData] = useState<{ [key: string]: any }>(() => {
		const formData: { [key: string]: any } = {};
		// `${attribute.id}-${attribute.name}`
		product.attributes.forEach((attribute) => {
			formData[`${attribute.id}-${attribute.name}`] =
				attribute.options[0].id;
		});

		return formData;
	});

	const [openSuccessAddToCartPopup, setOpenSuccessAddToCartPopup] =
		useState(false);
	const [quantity, setQuantity] = useState(0);

	function addToBag() {
		if (quantity <= 0) return;
		// if product already exists
		const cartItem = cart.find((c) => c.product.id == product.id);
		if (cartItem) {
			setCart((prev) =>
				prev.map((c) =>
					c == cartItem
						? {
								...c,
								quantity: c.quantity + quantity,
						  }
						: c
				)
			);
		} else {
			// new
			const itemData = {
				id: uuid(),
				quantity: quantity,
				product: {
					...product,
				},
				subtotal: Number(product.price!) * quantity,
			};

			setCart((prev) => {
				return [...prev, itemData];
			});
		}

		setOpenSuccessAddToCartPopup(true);
	}

	function incrementQuantity() {
		setQuantity((prev) => prev + 1);
	}

	function decrementQuantity() {
		if (quantity <= 0) return;
		setQuantity((prev) => prev - 1);
	}

	function handleDataChange(
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) {
		const key = e.target.id;
		setData((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	}

	return (
		<section className="shop-product-detail-form">
			{openSuccessAddToCartPopup && (
				<SuccessAddToCartPopup
					product={product}
					quantity={quantity}
					close={() => setOpenSuccessAddToCartPopup(false)}
				/>
			)}

			<h1 className="product-name">{product.name}</h1>
			<h2 className="product-price">
				{formatCurrencyRupiah(product.price!)}
			</h2>
			<p className="product-description">{product.short_description}</p>
			<hr className="mt-1 mb-1" />
			<form>
				{product.attributes.map((attribute) => (
					<>
						{attribute.type == "select" && (
							<div className="input-box">
								<label
									htmlFor={`${attribute.id}-${attribute.name}`}
								>
									{attribute.name} - {category.name}
								</label>
								<select
									name={`${attribute.id}-${attribute.name}`}
									id={`${attribute.id}-${attribute.name}`}
									value={
										data[
											`${attribute.id}-${attribute.name}`
										]
									}
									onChange={handleDataChange}
								>
									{attribute.options.map((option) => (
										<option value={option.id}>
											{option.name}
										</option>
									))}
								</select>
							</div>
						)}
					</>
				))}

				<div className="input-box mt-1">
					<label htmlFor="keterangan">Keterangan</label>
					<input
						value={data.keterangan}
						onChange={handleDataChange}
						type="text"
						name="keterangan"
						id="keterangan"
					/>
				</div>

				<div className="mt-1-05 quantity-and-add-to-bag-button">
					<button
						type="button"
						className="btn btn-outline quantity-button no-hover no-pointer"
					>
						<div onClick={decrementQuantity}>
							<IconMinus width="10" height="10" />
						</div>
						<p>{quantity}</p>
						<div onClick={incrementQuantity}>
							<IconPlus width="14" height="14" />
						</div>
					</button>
					<button
						type="button"
						className="btn uppercase add-to-bag-button"
						onClick={addToBag}
					>
						<IconBag width="14" height="17" />
						Add to bag
					</button>
				</div>
			</form>
		</section>
	);
}
