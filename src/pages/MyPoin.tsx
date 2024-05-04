import IconTrophy from "../assets/icons/IconTrophy";
import SearchBar from "../components/SearchBar";

export default function MyPoin() {
	return (
		<>
			<section className="container container-sidebar" id="my-poin">
				<div className="container-sidebar-header">
					<h2 className="container-sidebar-header-left container-sidebar-title">
						Reward
					</h2>
					<div className="container-sidebar-header-right flex gap-1 items-center justify-between">
						<h2 className="container-sidebar-title">History</h2>
						<SearchBar placeholder="Search" />
					</div>
				</div>
				<div className="container-sidebar-content mt-1">
					<div className="container-sidebar-left my-poin-reward">
						<div className="card-bordered my-poin-profile">
							<div className="my-poin-profile-image">
								<img
									src={`${
										import.meta.env.VITE_APP_URL
									}./images/people/people1.png`}
									alt={`${
										import.meta.env.VITE_APP_NAME
									} - people`}
								/>
								<div className="icon">
									<IconTrophy width="14" height="14" />
								</div>
							</div>
							<h3 className="mt-1 mb-1">Edwin H.</h3>
							<p className="semibold">Your Balance</p>
							<div className="poin flex gap-05">
								<img
									src={`${
										import.meta.env.VITE_APP_URL
									}./images/poin.png`}
									alt={`${
										import.meta.env.VITE_APP_NAME
									} - poin`}
								/>
								<p className="secondary bold">8228</p>
							</div>
							<p
								className="mt-1 text-center"
								style={{
									width: "150px",
									fontSize: '.8rem'
								}}
							>
								Available points will Expires in 24 April 2025
							</p>
						</div>
					</div>
					<div className="container-sidebar-right my-poin-history">
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
				</div>
			</section>
		</>
	);
}
