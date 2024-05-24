import IconStarFilled from "../assets/icons/IconStarFilled";

type RatingStarsProps = {
	rating: number;
	size?: string;
};
export default function RatingStars({ rating, size = '20' }: RatingStarsProps) {
	// console.log(rating);
	return (
		<div className="stars">
			{Array(rating)
				.fill(0)
				.map((_, i) => (
					<span className="stars-filled" key={i}>
						<IconStarFilled width={size} height={size} />
					</span>
				))}
			{Array(5 - rating)
				.fill(0)
				.map((_, i) => (
					<span className="stars-empty" key={i}>
						<IconStarFilled width={size} height={size} />
					</span>
				))}
		</div>
	);
}
