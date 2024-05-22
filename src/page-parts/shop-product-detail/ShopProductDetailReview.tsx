import {
	CSSProperties,
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	useMemo,
	useState,
} from "react";
import ReviewData from "../../assets/data/review.json";
import { ReviewType } from "../../dto/ReviewType";
import RatingStars from "../../components/RatingStars";
import PaginationToolsWatcher from "../../components/PaginationToolsWatcher";
import DropdownFilter from "../../components/DropdownFilter";

const MAX_PAGE_ON_PAGINATION = 5;
const DEFAULT_ITEMS_PER_PAGE = 4;

export default function ShopProductDetailReview() {
	const [reviews, setReviews] = useState<ReviewType[]>(ReviewData);
	const [reviewsPerPage, setReviewsPerPage] = useState(
		DEFAULT_ITEMS_PER_PAGE
	);
	const [ratings, setRatings] = useState([
		"Bintang 1",
		"Bintang 2",
		"Bintang 3",
		"Bintang 4",
		"Bintang 5",
	]);
	const [currentRatings, setCurrentRatings] = useState<string[]>([
		"Bintang 1",
		"Bintang 2",
		"Bintang 3",
		"Bintang 4",
		"Bintang 5",
	]);
	const [medias, setMedias] = useState(["Dengan Media"]);
	const [currentMedias, setCurrentMedias] = useState<string[]>([]);
	const withMedia = useMemo(
		() => currentMedias.includes("Dengan Media"),
		[currentMedias]
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState("l-h");
	const maxPage = Math.ceil(reviews.length / reviewsPerPage);

	const overAllRating = useMemo(() => {
		if (ReviewData.length == 0) return 0;
		return Number(
			(
				ReviewData.reduce((acc, curr) => acc + curr.rating, 0) /
				ReviewData.length
			).toFixed(1)
		);
	}, [ReviewData]);

	useEffect(() => {
		setCurrentPage(1);
		filterByRating();
	}, [currentRatings]);

	function setPage(to: string | number) {
		if (typeof to == "number") {
			if (to == currentPage) return;
			setCurrentPage(to);
		}

		if (to == "next" && currentPage < maxPage) {
			setCurrentPage((prev) => prev + 1);
		} else if (to == "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	}

	function setTotalReviewsPerPage(e: ChangeEvent<HTMLSelectElement>) {
		const value = Number(e.currentTarget.value);
		setReviewsPerPage(value);
		setCurrentPage(1);
	}

	function filterByRating() {
		setReviews(() => {
			const things = ReviewData.filter((review) =>
				currentRatings.includes(`Bintang ${review.rating}`)
			);
			return things;
		});
	}

	function paginateReviews() {
		const firstIndex = (currentPage - 1) * reviewsPerPage;
		const lastIndex = firstIndex + reviewsPerPage;
		return reviews.slice(firstIndex, lastIndex);
	}

	function sortReviews() {
		if (sortBy == "l-h") {
			setReviews((latestReviews) => {
				return [...latestReviews].sort((a, b) => {
					if (a.rating < b.rating) {
						return -1;
					}
					if (a.rating > b.rating) {
						return 1;
					}
					return 0;
				});
			});
		} else if (sortBy == "h-l") {
			setReviews((latestReviews) => {
				return [...latestReviews].sort((a, b) => {
					if (a.rating < b.rating) {
						return 1;
					}
					if (a.rating > b.rating) {
						return -1;
					}
					return 0;
				});
			});
		}
	}

	return (
		<section className="shop-product-detail-review">
			<section className="product-review">
				<h2 className="mb-2">Ulasan Produk</h2>
				<div className="product-review-total-rating">
					<div className="rating-desc">
						<h3>{overAllRating}</h3>
						<RatingStars
							rating={Math.floor(overAllRating)}
						></RatingStars>
						<p>({reviews.length} ulasan)</p>
					</div>
					<div className="rating-progresses">
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<div className="rating-progress" key={i}>
									<p>{i + 1}</p>
									<div
										className="rating-progress-bar"
										style={
											{
												"--progress-percentage":
													(ReviewData.filter(
														(r) => r.rating == i + 1
													).length /
														ReviewData.length) *
													100,
											} as CSSProperties
										}
									></div>
									<p>
										{
											ReviewData.filter(
												(r) => r.rating == i + 1
											).length
										}
									</p>
								</div>
							))}
					</div>
				</div>
				<div className="flex mt-2 gap-1">
					<select
						style={{
							width: "100%",
						}}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="l-h">Low to High</option>
						<option value="h-l">High to Low</option>
					</select>
					<button
						className="btn"
						onClick={() => sortReviews()}
						style={{
							width: "100%",
							maxWidth: "200px",
						}}
					>
						Filter
					</button>
				</div>

				<DropdownFilter
					open={true}
					title="Rating"
					items={ratings}
					type="checkbox"
					onFilter={setCurrentRatings}
					currentItem={currentRatings}
				/>
				<DropdownFilter
					open={true}
					title="Dengan Media"
					items={medias}
					type="checkbox"
					onFilter={setCurrentMedias}
					currentItem={currentMedias}
				/>
			</section>
			<section className="chosen-review">
				<h2 className="mb-2">Ulasan Pilihan</h2>
				{paginateReviews().map((review) => (
					<div className="review-card" key={review.id}>
						<div className="review-card-user">
							<img
								className="review-card-user-profile"
								src={`${import.meta.env.VITE_APP_URL}${
									review.user.profile_image
								}`}
								alt={`${import.meta.env.APP_NAME} - ${
									review.user.name
								}`}
							/>
							<div>
								<h4 className="mb-05">{review.user.name}</h4>
								<RatingStars rating={review.rating} />
							</div>
							<p className="review-card-published-at">
								{review.created_at}
							</p>
						</div>
						<p className="mt-1">{review.text}</p>
						{review.medias.length > 0 && withMedia && (
							<div className="mt-1 review-card-medias">
								{review.medias.map((media) => (
									<div key={media.id}>
										<img
											src={`${
												import.meta.env.VITE_APP_URL
											}${media.image}`}
											alt={`${
												import.meta.env.APP_NAME
											} - ${media.id}`}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				))}
				<PaginationToolsWatcher
					MAX_PAGE_ON_PAGINATION={MAX_PAGE_ON_PAGINATION}
					DEFAULT_ITEMS_PER_PAGE={DEFAULT_ITEMS_PER_PAGE}
					setTotalItemsPerPage={setTotalReviewsPerPage}
					itemsPerPage={reviewsPerPage}
					setPage={setPage}
					currentPage={currentPage}
					maxPage={maxPage}
				/>
			</section>
		</section>
	);
}
