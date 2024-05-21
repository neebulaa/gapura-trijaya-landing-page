import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import fetching from "../utils/fetching";
import Alert from "../components/Alert";
import ErrorMessages from "../components/ErrorMessages";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
export default function Login() {
	const { setUser } = useAuth();
	const navigator = useNavigate();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<{ [key: string]: any }>({});

	async function login(e: SyntheticEvent) {
		e.preventDefault();

		const response = await fetching("post", "auth/login", {
			data,
		});

		setErrors({});
		if (response.status === 422) {
			setErrors(response.data);
		} else if (response.status === 401) {
			setErrors({
				message: "Invalid credentials! Try again!",
			});
			setData({
				email: "",
				password: "",
			});
		} else if (response.status == 200) {
			const token = response.data.authorization.access_token;
			console.log(response.data);
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
		<section className="container" id="login">
			<div className="login-image">
				<img
					className="login-image-main"
					src={`${import.meta.env.VITE_APP_URL}./images/login.png`}
					alt={`${import.meta.env.VITE_APP_NAME} - hero image login`}
				/>

				{/* image decoration */}
				<img
					className="login-image-1"
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
					className="login-image-2"
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
			<div className="login-form">
				<h1>Login</h1>
				<p className="text-center mt-1">
					Hey, enter your details to get sign in to your account
				</p>
				<form className="mt-2" onSubmit={login}>
					{errors.message && (
						<Alert type="danger" className="mb-2">
							{errors.message}
						</Alert>
					)}

					<div className="input-box">
						<label htmlFor="email">Email/Phone Number</label>
						<input
							type="text"
							id="email"
							name="email"
							value={data.email}
							onChange={handleUpdateData}
						/>
					</div>
					<ErrorMessages messages={errors.email} />
					<div className="input-box mt-1">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={data.password}
							onChange={handleUpdateData}
						/>
					</div>
					<ErrorMessages messages={errors.password} />
					<button className="btn w-100 mt-1-05">Login</button>
				</form>
				<Link
					to="/register"
					className="w-100 highlight text-center mt-1 flex justify-center"
				>
					Doesn't Have account yet? Register here!
				</Link>
			</div>
		</section>
	);
}
