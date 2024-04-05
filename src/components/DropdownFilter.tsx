import { useState, useId } from "react";

type DropdownFilterProps = {
	title: string;
	items: string[];
	max?: number;
	type?: string;
	onFilter: Function;
	currentItem: string | string[];
	open?:boolean;
};
const FilterType = ["link", "checkbox", "radio"];
export default function DropdownFilter({
	title,
	items,
	max = 5,
	type = "link",
	onFilter,
	currentItem,
	open = false
}: DropdownFilterProps) {
	if (!FilterType.includes(type)) {
		type = "link";
	}
	const componentId = useId();
	const [openDropdown, setOpenDropdown] = useState(open);
	const [openAll, setOpenAll] = useState(false);

	const [itemValue, setItemValue] = useState(() => {
		if (type == "checkbox") {
			return [] as string[];
		}
		return "";
	});

	function setItem(item: string) {
		let storeItemValue = itemValue;
		if (type == "checkbox") {
			setItemValue((prevItem) => {
				if (prevItem.includes(item)) {
					storeItemValue = (prevItem as string[]).filter(
						(pI) => pI != item
					);
					return storeItemValue;
				}
				storeItemValue = [...prevItem, item];
				return storeItemValue;
			});
		} else {
			storeItemValue = item;
			setItemValue(storeItemValue);
		}
		onFilter(storeItemValue);
	}

	function toggleOpenAll() {
		setOpenAll((prevOpen) => !prevOpen);
	}

	function toggleOpenDropdown() {
		setOpenDropdown((prevOpen) => !prevOpen);
	}

	return (
		<section className="dropdown-filter">
			<header
				className="dropdown-filter-header"
				onClick={toggleOpenDropdown}
			>
				<h4>{title}</h4>
				<i className="fa-solid fa-angle-down"></i>
			</header>
			<section
				className={`dropdown-filter-items ${
					openDropdown ? "open" : ""
				}`}
			>
				{items
					.slice(0, openAll ? undefined : max)
					.map((item, index) => {
						if (type == "link")
							return (
								<button
									onClick={() => setItem(item)}
									key={`${componentId} - ${index}`}
									className={`btn-link ${
										item == currentItem ? "current" : ""
									}`}
								>
									{item}
								</button>
							);

						return (
							<label
								key={`${componentId} - ${index}`}
								className="btn-link flex items-center gap-05"
							>
								{type == "checkbox" && (
									<>
										<input
											type="checkbox"
											style={{
												width: "15px",
												height: "15px",
											}}
											onChange={() => setItem(item)}
											checked={currentItem.includes(item)}
											id={`${componentId}-${item}`}
										/>
										<span className="btn-link">{item}</span>
									</>
								)}
								{type == "radio" && (
									<>
										<input
											type="radio"
											style={{
												width: "15px",
												height: "15px",
											}}
											name={`${componentId}-radio`}
											onChange={() => setItem(item)}
											checked={currentItem == item}
											id={`${componentId}-${item}`}
										/>
										<span className="btn-link">{item}</span>
									</>
								)}
							</label>
						);
					})}
				{items.length > 5 && (
					<button className="see-all" onClick={toggleOpenAll}>
						{openAll ? "See less" : "See all"}
					</button>
				)}
			</section>
		</section>
	);
}
