import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import fetching from "../utils/fetching";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function Register() {
	const { setUser } = useAuth();
	const navigator = useNavigate();
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	const [errors, setErrors] = useState<{ [key: string]: any }>({});

	async function register(e: SyntheticEvent) {
		e.preventDefault();

		const response = await fetching("post", "auth/register", {
			data,
		});

		setErrors({});
		if (response.status === 422) {
			setErrors(response.data);
		} else if (response.status === 401) {
			setErrors({
				message: "Invalid credentials! Try again!",
			});
		} else if (response.status == 200) {
			const token = response.data.authorization.access_token;
			localStorage.setItem(
				`${import.meta.env.VITE_APP_NAME}-authtoken`,
				token
			);
			setUser(response.data.user);
			navigator("/");
		}
	}

	function handleUpdateData(e: ChangeEvent<HTMLInputElement>) {
		const key = e.target.name;
		setData((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	}

	return (
		<section className="container" id="register">
			<div className="register-form">
				<h1>Register</h1>
				<p className="mt-1 text-center">
					Hey, enter your details to get create your account
				</p>
				<form className="mt-1-05" onSubmit={register}>
					<div className="input-box w-100">
						<label htmlFor="name">
							Name <span className="accent">*</span>
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Edwin"
							value={data.name}
							onChange={handleUpdateData}
						/>
					</div>
					{errors.name &&
						errors.name.map((error: string) => (
							<p className="accent mt-05">{error}</p>
						))}

					<div className="input-box w-100 mt-1">
						<label htmlFor="email">
							Email{" "}
							<span className="muted italic">(optional)</span>
						</label>
						<input
							type="text"
							id="email"
							name="email"
							value={data.email}
							onChange={handleUpdateData}
						/>
					</div>
					{errors.email &&
						errors.email.map((error: string) => (
							<p className="accent mt-05">{error}</p>
						))}

					<div className="input-box w-100 mt-1">
						<label htmlFor="phone">
							Phone Number (Whatsapp){" "}
							<span className="accent">*</span>
						</label>
						<div className="flex gap-05">
							<div className="flag-phone">
								<div className="flag">
									<div className="red"></div>
									<div className="white"></div>
								</div>
								<select name="countryPhone" id="countryPhone">
									<option value="indonesia">+62</option>
									<option value="malaysia">+60</option>
									<option value="singapore">+65</option>
								</select>
							</div>
							<input
								className="w-100"
								type="text"
								id="phone"
								name="phone"
								placeholder="089796245748"
								value={data.phone}
								onChange={handleUpdateData}
							/>
						</div>
					</div>
					{errors.phone &&
						errors.phone.map((error: string) => (
							<p className="accent mt-05">{error}</p>
						))}

					<div className="input-box w-100 mt-1">
						<label htmlFor="password">
							New Password <span className="accent">*</span>
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={data.password}
							onChange={handleUpdateData}
						/>
					</div>
					{errors.password &&
						errors.password.map((error: string) => (
							<p className="accent mt-05">{error}</p>
						))}

					<button className="btn w-100 mt-1-05">Register</button>
				</form>
				<Link
					to="/login"
					className="flex mt-1 highlight justify-center"
				>
					Already have account? Login now!
				</Link>
			</div>
			<div className="register-image">
				<img
					className="register-image-main"
					src={`${import.meta.env.VITE_APP_URL}./images/register.png`}
					alt={`${
						import.meta.env.VITE_APP_NAME
					} - hero image register`}
				/>

				{/* image decoration */}
				<img
					className="register-image-1"
					src={`${
						import.meta.env.VITE_APP_URL
					}./images/decoration.png`}
					alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
					style={{
						zIndex: -1,
						position: "absolute",
						top: "70%",
						left: "98%",
					}}
				/>

				<img
					className="register-image-2"
					src={`${
						import.meta.env.VITE_APP_URL
					}./images/decoration.png`}
					alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
					style={{
						zIndex: -1,
						position: "absolute",
						top: 0,
						left: 0,
						translate: "-120% -50%",
					}}
				/>
			</div>
		</section>
	);
}
