import { useEffect, useMemo, useRef, useState } from "react";
import { ProductType } from "../../dto/ProductType";
import { getElementProperty } from "../../utils/getElementProperty";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import IconChevronRight from "../../assets/icons/IconChevronRight";

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

	const [isMobile, setIsMobile] = useState(() => {
		return window.innerWidth <= 768;
	});

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 768);
		}
		addEventListener("resize", handleResize);
	}, []);

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
				<div className={`subs-container ${isMobile ? "mobile" : ""}`}>
					{!isMobile && index > 0 && (
						<button
							className="navigator navigator-left"
							onClick={() => setIndex((prev) => prev - 1)}
						>
							<IconChevronLeft width="25" height="25" />
						</button>
					)}

					{!isMobile && index < maxIndex && (
						<button
							className="navigator navigator-right"
							onClick={() => setIndex((prev) => prev + 1)}
						>
							<IconChevronRight width="25" height="25" />
						</button>
					)}

					{!isMobile && (
						<div
							className="container-content"
							style={{
								translate: `-${
									isMobile
										? 0
										: index == 0
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
												<div
													key={product.id}
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
											))}
									</div>
								))}
						</div>
					)}

					{isMobile && (
						<div className="container-content mobile">
							{subProducts.map((product) => (
								<div
									key={product.id}
									className="sub"
									onClick={() => setMainProduct(product)}
								>
									<img
										src={`${import.meta.env.VITE_APP_URL}${
											product.image
										}`}
										alt={`${
											import.meta.env.VITE_APP_NAME
										}import IconChevronLeft from './../assets/icons/IconChevronLeft';
 - ${product.name}`}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
