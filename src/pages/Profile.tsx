import SearchBar from "../components/SearchBar";

export default function Profile() {
	return (
		<section className="container container-sidebar" id="my-profile">
			<div className="container-sidebar-left my-poin-reward">
				<h2 className="container-sidebar-header-left container-sidebar-title">
					My Profile
				</h2>
				<div className="card-bordered my-profile-profile">
					<img
						src={`${
							import.meta.env.VITE_APP_URL
						}./images/people/people1.png`}
						alt={`${import.meta.env.VITE_APP_NAME} - people`}
					/>
                    <div></div>
				</div>
			</div>
			<div className="container-sidebar-right my-poin-history">
				<div className="flex gap-1 justify-between flex-wrap">
					<h2 className="container-sidebar-title"></h2>
					<SearchBar placeholder="Search" padding=".5rem" />
				</div>
				<div className="my-poin-history-cards">
					<div className="my-poin-history-card">
						<div className="my-poin-history-card-content">
							<h4>In Store Order #ORD002</h4>
							<p className="mt-05">24 April 2024</p>
						</div>
						<p className="highlight semibold">+170</p>
					</div>
					<div className="my-poin-history-card">
						<div className="my-poin-history-card-content">
							<h4>Redeemed #ORD001</h4>
							<p className="mt-05">24 April 2024</p>
						</div>
						<p className="accent semibold">-1200</p>
					</div>
					<div className="my-poin-history-card">
						<div className="my-poin-history-card-content">
							<h4>Delivery Order #ORD003</h4>
							<p className="mt-05">24 April 2024</p>
						</div>
						<p className="highlight semibold">+240</p>
					</div>
				</div>
			</div>
		</section>
	);
}
