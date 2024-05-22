import { ChangeEvent } from "react";
import IconChevronLeft from "../assets/icons/IconChevronLeft";
import IconChevronRight from "../assets/icons/IconChevronRight";

type PaginationToolsWatcher = {
	MAX_PAGE_ON_PAGINATION: number;
	DEFAULT_ITEMS_PER_PAGE: number;
	setTotalItemsPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
	itemsPerPage: number;
	setPage: Function;
	currentPage: number;
	maxPage: number;
};
export default function PaginationToolsWatcher({
	MAX_PAGE_ON_PAGINATION = 5,
	DEFAULT_ITEMS_PER_PAGE = 5,
	setTotalItemsPerPage,
	itemsPerPage,
	setPage,
	currentPage,
	maxPage,
}: PaginationToolsWatcher) {
	return (
		<section className="pagination-tools-watcher">
			<select
				id="pagination-tools-perpage"
				onChange={setTotalItemsPerPage}
				value={itemsPerPage}
			>
				<option value={DEFAULT_ITEMS_PER_PAGE}>
					Show {DEFAULT_ITEMS_PER_PAGE}
				</option>
				<option value={10}>Show 10</option>
				<option value={20}>Show 20</option>
				<option value={50}>Show 50</option>
				<option value={100}>Show 100</option>
			</select>
			<section className="btn-split">
				<button
					onClick={() => setPage("previous")}
					className={`${currentPage == 1 ? "inactive" : ""}`}
					disabled={currentPage == 1}
				>
					<IconChevronLeft width={"25"} height={"25"} />
				</button>
				{new Array(
					MAX_PAGE_ON_PAGINATION > maxPage
						? maxPage
						: MAX_PAGE_ON_PAGINATION
				)
					.fill(0)
					.map((_, i) => {
						let page = i + 1;
						const pageMinThreshold =
							MAX_PAGE_ON_PAGINATION -
							Math.floor(MAX_PAGE_ON_PAGINATION / 2);
						const pageMaxThreshold =
							maxPage - Math.floor(MAX_PAGE_ON_PAGINATION / 2);
						let currentPageToWatch = currentPage;
						if (currentPageToWatch >= pageMaxThreshold) {
							currentPageToWatch = pageMaxThreshold;
						}

						if (currentPageToWatch > pageMinThreshold) {
							page += currentPageToWatch - pageMinThreshold;
						}

						return (
							<button
								onClick={() => setPage(page)}
								key={i}
								className={`${
									page == currentPage ? "active" : ""
								}`}
							>
								{page}
							</button>
						);
					})}
				<button
					onClick={() => setPage("next")}
					disabled={currentPage == maxPage}
					className={`${currentPage == maxPage ? "inactive" : ""}`}
				>
					<IconChevronRight width={"25"} height={"25"} />
				</button>
			</section>
		</section>
	);
}
