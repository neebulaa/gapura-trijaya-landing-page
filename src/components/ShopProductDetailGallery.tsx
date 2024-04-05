import { Fragment, useMemo, useRef, useState } from "react";
import { ProductType } from "../dto/ProductType";
import { getElementProperty } from "../utils/getElementProperty";
type ShopProductDetailGalleryProps = {
	products: ProductType[];
	mainProduct: ProductType;
	setMainProduct: (item: ProductType) => void;
};

export default function ShopProductDetailGallery({
	products = [],
	mainProduct,
	setMainProduct,
}: ShopProductDetailGalleryProps) {
	const subProducts = useMemo(
		() => products.filter((product) => product !== mainProduct),
		[products]
	);

	const gallery = useRef<HTMLElement>(null);
	const subsCount = 4;

	const [index, setIndex] = useState(0);
	const maxIndex = useMemo(() => {
		const n = subProducts.length;
		return n <= subsCount ? 0 : Math.ceil((n - subsCount) / 2);
	}, [subProducts, gallery]);

	return (
		<>
			<section className="shop-product-detail-gallery" ref={gallery}>
				<div className="main">
					<img
						src={`${import.meta.env.VITE_APP_URL}${
							mainProduct.image
						}`}
						alt={`${import.meta.env.VITE_APP_NAME} - ${
							mainProduct.name
						}`}
					/>
				</div>
				<div className="subs-container">
					{index > 0 && (
						<div
							className="navigator navigator-left"
							onClick={() => setIndex((prev) => prev - 1)}
						>
							<i className="fa-solid fa-chevron-left"></i>
						</div>
					)}

					{index < maxIndex && (
						<div
							className="navigator navigator-right"
							onClick={() => setIndex((prev) => prev + 1)}
						>
							<i className="fa-solid fa-chevron-right"></i>
						</div>
					)}
					<div
						className="container-content"
						style={{
							translate: `-${
								index == 0
									? 0
									: ((parseInt(
											getElementProperty(
												gallery.current!,
												"--gallery-width"
											)
									  ) +
											parseInt(
												getElementProperty(
													gallery.current!,
													"--gallery-gap"
												)
											)) /
											Math.floor(subsCount / 2)) *
											index -
									  (subProducts.length % 2 === 1 &&
									  index == maxIndex
											? 1 *
											  ((parseInt(
													getElementProperty(
														gallery.current!,
														"--gallery-width"
													)
											  ) +
													parseInt(
														getElementProperty(
															gallery.current!,
															"--gallery-gap"
														)
													)) /
													subsCount)
											: 0)
							}px`,
						}}
					>
						{Array(Math.ceil(subProducts.length / subsCount))
							.fill(0)
							.map((_, i) => (
								<div className="subs" key={i}>
									{subProducts
										.slice(
											i * subsCount,
											(i + 1) * subsCount
										)
										.map((product) => (
											<Fragment key={product.id}>
												<div
													className="sub"
													onClick={() =>
														setMainProduct(product)
													}
												>
													<img
														src={`${
															import.meta.env
																.VITE_APP_URL
														}${product.image}`}
														alt={`${
															import.meta.env
																.VITE_APP_NAME
														} - ${product.name}`}
													/>
												</div>
											</Fragment>
										))}
								</div>
							))}
					</div>
				</div>
			</section>
		</>
	);
}
