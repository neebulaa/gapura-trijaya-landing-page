export type ReviewType = {
	id: number;
	text: string;
	rating: number;
	user: {
		name: string;
		profile_image: string;
	};
	medias: { id: number; image: string }[];
	created_at: string;
};
