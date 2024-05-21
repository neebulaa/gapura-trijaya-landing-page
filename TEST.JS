const data = {
	id: "01hyb3041n324bnq4mqs7mnqdb",
	parent_id: null,
	user_id: "01hyb300pt7195mmrp279g85n6",
	sku: "plakat-akrilik",
	type: "configurable",
	name: "Plakat Akrilik",
	slug: "plakatakrilik",
	price: 250000,
	weight: null,
	width: null,
	height: null,
	length: null,
	short_description:
		"Plakat akrilik custom dengan ketebalan 5mm/8mm. Dipotong dengan mesin laser terbaik, yang menghasilkan potongan yang rapih dan halus.",
	description:
		"Plakat akrilik custom dengan ketebalan 5mm/8mm. Dipotong dengan mesin laser terbaik, yang menghasilkan potongan yang rapih dan halus.",
	status: 1,
	created_at: "2024-05-20T13:28:03.000000Z",
	updated_at: "2024-05-20T13:28:03.000000Z",
	attributes: [
		{
			id: "01hyb30296xg29qym7wt1a4rpc",
			code: "ketebalan",
			name: "Ketebalan",
			type: "select",
			validation: null,
			is_required: 0,
			is_unique: 0,
			is_filterable: 0,
			is_configurable: 0,
			created_at: "2024-05-20T13:28:01.000000Z",
			updated_at: "2024-05-20T13:28:01.000000Z",
			options: [
				{
					id: "01hyb30298hfy6djkz0dkmgb0z",
					attribute_id: "01hyb30296xg29qym7wt1a4rpc",
					name: "5mm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb3029bfqhcfyvpbfgxna2q",
					attribute_id: "01hyb30296xg29qym7wt1a4rpc",
					name: "8mm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
			],
			pivot: {
				product_id: "01hyb3041n324bnq4mqs7mnqdb",
				attribute_id: "01hyb30296xg29qym7wt1a4rpc",
				id: "01hyb30apte3wh5hfh1a5zaw7d",
			},
		},
		{
			id: "01hyb3027gvpxcrx7xxvkh01e2",
			code: "ukuran",
			name: "Ukuran",
			type: "select",
			validation: null,
			is_required: 0,
			is_unique: 0,
			is_filterable: 0,
			is_configurable: 0,
			created_at: "2024-05-20T13:28:01.000000Z",
			updated_at: "2024-05-20T13:28:01.000000Z",
			options: [
				{
					id: "01hyb30289ss20pd1dqh18eesq",
					attribute_id: "01hyb3027gvpxcrx7xxvkh01e2",
					name: "15 x 10 cm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb3028qt39v25p99qww44tc",
					attribute_id: "01hyb3027gvpxcrx7xxvkh01e2",
					name: "20 x 10 cm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb3028t5qp4ht1ppq459v8f",
					attribute_id: "01hyb3027gvpxcrx7xxvkh01e2",
					name: "20 x 15 cm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb3028wc62cwk94x2e2snsh",
					attribute_id: "01hyb3027gvpxcrx7xxvkh01e2",
					name: "20 x 20 cm",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
			],
			pivot: {
				product_id: "01hyb3041n324bnq4mqs7mnqdb",
				attribute_id: "01hyb3027gvpxcrx7xxvkh01e2",
				id: "01hyb30aq430jfcv6g87edep1k",
			},
		},
		{
			id: "01hyb302aftd44ypkk6xr9b586",
			code: "jeniskaki",
			name: "Jenis Kaki",
			type: "select",
			validation: null,
			is_required: 0,
			is_unique: 0,
			is_filterable: 0,
			is_configurable: 0,
			created_at: "2024-05-20T13:28:01.000000Z",
			updated_at: "2024-05-20T13:28:01.000000Z",
			options: [
				{
					id: "01hyb302ajba0xkzk4bdfg8qb3",
					attribute_id: "01hyb302aftd44ypkk6xr9b586",
					name: "Kaki Standar",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb302anm44mrecxj5azza7j",
					attribute_id: "01hyb302aftd44ypkk6xr9b586",
					name: "Kaki Kotak",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
			],
			pivot: {
				product_id: "01hyb3041n324bnq4mqs7mnqdb",
				attribute_id: "01hyb302aftd44ypkk6xr9b586",
				id: "01hyb30aqk1ztf1nfx96ykzv7x",
			},
		},
		{
			id: "01hyb302argtvdypp0bv6bx24m",
			code: "boxplakatbuldru",
			name: "Box Plakat Buldru",
			type: "select",
			validation: null,
			is_required: 0,
			is_unique: 0,
			is_filterable: 0,
			is_configurable: 0,
			created_at: "2024-05-20T13:28:01.000000Z",
			updated_at: "2024-05-20T13:28:01.000000Z",
			options: [
				{
					id: "01hyb302atw90e7zxaxgnm65h9",
					attribute_id: "01hyb302argtvdypp0bv6bx24m",
					name: "Ya",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
				{
					id: "01hyb302axbdztjcexysmvjpcs",
					attribute_id: "01hyb302argtvdypp0bv6bx24m",
					name: "Tidak",
					created_at: "2024-05-20T13:28:01.000000Z",
					updated_at: "2024-05-20T13:28:01.000000Z",
				},
			],
			pivot: {
				product_id: "01hyb3041n324bnq4mqs7mnqdb",
				attribute_id: "01hyb302argtvdypp0bv6bx24m",
				id: "01hyb30aqweqqaczp1dfwcvyyz",
			},
		},
	],
};

const sizes = ["12 x 4cm", "10 x 2cm", "20 x 1cm"];
const types = ["A", "B", "C"];
const shapes = ["Oval", "Circle", "Square"];
const items = [sizes, types, shapes];

function getCombinations(items) {
	const result = [];

	function combine(arr, index) {
		if (index === items.length) {
			result.push(arr);
			return;
		}

		for (let i = 0; i < items[index].length; i++) {
			combine([...arr, items[index][i]], index + 1);
		}
	}

	combine([], 0);
	return result;
}

const combinations = getCombinations(items);
console.log(combinations);
