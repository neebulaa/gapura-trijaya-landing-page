import { useEffect, useMemo, useRef, useState } from "react";
import { ProductImageType } from "../../dto/ProductImageType";
import { getElementProperty } from "../../utils/getElementProperty";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import IconChevronRight from "../../assets/icons/IconChevronRight";

type ShopProductDetailGalleryProps = {
	images: ProductImageType[];
};

export default function ShopProductDetailGallery({
	images = [],
}: ShopProductDetailGalleryProps) {
	const [highlightedImage, setHighlightedImage] = useState<ProductImageType>(
		() => (images.length ? images[0] : ({} as ProductImageType))
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
		const n = images.length;
		return n <= subsCount ? 0 : Math.ceil((n - subsCount) / 2);
	}, [images, gallery]);

	return (
		<>
			<section className="shop-product-detail-gallery" ref={gallery}>
				<div className="main">
					<img
						src={`${highlightedImage.path}`}
						alt={`${import.meta.env.VITE_APP_NAME} - ${
							highlightedImage.path
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
										  (images.length % 2 === 1 &&
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
							{Array(Math.ceil(images.length / subsCount))
								.fill(0)
								.map((_, i) => (
									<div className="subs" key={i}>
										{images
											.slice(
												i * subsCount,
												(i + 1) * subsCount
											)
											.map((image) => (
												<div
													key={image.id}
													className="sub"
													onClick={() =>
														setHighlightedImage(
															image
														)
													}
												>
													<img
														src={`${image.path}`}
														alt={`${
															import.meta.env
																.VITE_APP_NAME
														} - ${image.id}`}
													/>
												</div>
											))}
									</div>
								))}
						</div>
					)}

					{isMobile && (
						<div className="container-content mobile">
							{images.map((image) => (
								<div
									key={image.id}
									className="sub"
									onClick={() => setHighlightedImage(image)}
								>
									<img
										src={`${image.path}`}
										alt={`${
											import.meta.env.VITE_APP_NAME
										} - ${image.id}`}
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
