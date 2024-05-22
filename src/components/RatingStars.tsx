import IconStarFilled from "../assets/icons/IconStarFilled";

type RatingStarsProps = {
	rating: number;
};
export default function RatingStars({ rating }: RatingStarsProps) {
	// console.log(rating);
	return (
		<div className="stars">
			{Array(rating)
				.fill(0)
				.map((_, i) => (
					<span className="stars-filled" key={i}>
						<IconStarFilled width="20" height="20" />
					</span>
				))}
			{Array(5 - rating)
				.fill(0)
				.map((_, i) => (
					<span className="stars-empty" key={i}>
						<IconStarFilled width="20" height="20" />
					</span>
				))}
		</div>
	);
}
