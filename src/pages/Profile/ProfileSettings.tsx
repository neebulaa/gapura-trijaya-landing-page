import { useState } from "react";
import ToggleCheckboxButton from "./../../components/ToggleCheckboxButton";
import AppModal from "../../components/AppModal";
import IconEye from "../../assets/icons/IconEye";
export default function Settings() {
	const [openChangePasswordModal, setOpenChangePasswordModal] =
		useState(false);
	return (
		<>
			<h2 className="mb-1-05">Settings</h2>
			<div className="profile-settings-card">
				<div className="profile-settings-card-content">
					<h4>Language</h4>
					<p className="mt-05">Select your language</p>
				</div>
				<select name="settings-language" id="settings-language">
					<option value="indonesia">Indonesia</option>
					<option value="english">English</option>
				</select>
			</div>
			<div className="profile-settings-card mt-1-05">
				<div className="profile-settings-card-content">
					<h4>Push Notifications</h4>
					<p className="mt-05">Receive push notification</p>
				</div>
				<ToggleCheckboxButton />
			</div>
			<div className="profile-settings-card mt-1-05">
				<div className="profile-settings-card-content">
					<h4>Email Notification</h4>
					<p className="mt-05">Receive email notification</p>
				</div>
				<ToggleCheckboxButton />
			</div>
			<button
				className="btn mt-2"
				onClick={() => setOpenChangePasswordModal(true)}
			>
				Change password
			</button>

			{openChangePasswordModal && (
				<AppModal
					title="Change Password"
					close={() => setOpenChangePasswordModal(false)}
				>
					<form>
						<div className="input-box mt-1-05">
							<label htmlFor="old-password">Old Password</label>
							<div className="input-icon">
								<input
									id="old-password"
									name="old-password"
									type="old-password"
								/>
								<IconEye
									width="24"
									height="24"
									className="mr-05"
								/>
							</div>
						</div>
						<div className="input-box mt-1-05">
							<label htmlFor="new-password">New Password</label>
							<div className="input-icon">
								<input
									id="new-password"
									name="new-password"
									type="new-password"
								/>
								<IconEye
									width="24"
									height="24"
									className="mr-05"
								/>
							</div>
						</div>
						<div className="input-box mt-1-05">
							<label htmlFor="confirm-new-password">Confirm New Password</label>
							<div className="input-icon">
								<input
									id="confirm-new-password"
									name="confirm-new-password"
									type="confirm-new-password"
								/>
								<IconEye
									width="24"
									height="24"
									className="mr-05"
								/>
							</div>
						</div>
						<button type="button" className="btn w-100 mt-1-05">
							Save
						</button>
					</form>
				</AppModal>
			)}
		</>
	);
}
