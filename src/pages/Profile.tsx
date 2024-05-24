import { NavLink, Outlet } from "react-router-dom";
import IconTrophy from "../assets/icons/IconTrophy";
import SearchBar from "../components/SearchBar";
import IconOutlineLocation from "../assets/icons/IconOutlineLocation";
import IconUser from "../assets/icons/IconUser";
import IconPackage from "../assets/icons/IconPackage";
import IconSettings from "../assets/icons/IconSettings";

export default function Profile() {
	return (
		<section className="container container-sidebar" id="my-profile">
			<div className="container-sidebar-left">
			<div
					className="flex items-center"
					style={{
						height: "43.59px",
					}}
				>
					<h2 className="container-sidebar-header-left container-sidebar-title">
						My Profile
					</h2>
				</div>
				<div className="card-bordered">
					<section className="my-profile-profile">
						<img
							src={`${
								import.meta.env.VITE_APP_URL
							}./images/people/people1.png`}
							alt={`${import.meta.env.VITE_APP_NAME} - people`}
						/>
						<div className="my-profile-profile-desc">
							<p>
								Member <IconTrophy width="14" height="14" />
							</p>
							<h3 className="semibold">Edwin Hendly</h3>
						</div>
					</section>
					<section className="my-profile-navigations">
						<NavLink to="/profile/personal-information">
							<div className="flex items-center gap-05">
								<IconUser width="24" height="24" />
								Personal Information
							</div>
						</NavLink>
						<NavLink to="/profile/orders">
							<div className="flex items-center gap-05">
								<IconPackage width="24" height="24" />
								My Orders
							</div>
						</NavLink>
						<NavLink to="/profile/manage-addresses">
							<div className="flex items-center gap-05">
								<IconOutlineLocation width="24" height="24" />
								Manage Addresses
							</div>
						</NavLink>
						<NavLink to="/profile/settings">
							<div className="flex items-center gap-05">
								<IconSettings width="24" height="24" />
								Settings
							</div>
						</NavLink>
					</section>
				</div>
			</div>
			<div className="container-sidebar-right">
				<div className="flex items-center gap-1 justify-between flex-wrap">
					<h2 className="container-sidebar-title"></h2>
					<SearchBar placeholder="Search" />
				</div>
				<div className="card-bordered my-profile-content">
					<Outlet />
				</div>
			</div>
		</section>
	);
}
