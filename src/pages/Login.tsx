import { Link } from "react-router-dom";
import IconEye from "../assets/icons/IconEye";
export default function Login() {
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
				<p>Hey, enter your details to get sign in to your account</p>
				<form action="" className="mt-2">
					<div className="input-box">
						<label htmlFor="email">Email/Phone Number</label>
						<input type="text" id="email" name="email" />
					</div>
					<div className="input-box mt-1-05">
						<label htmlFor="password">Password</label>
						<div className="input-icon">
							<input
								id="password"
								name="password"
								type="password"
							/>
							<IconEye width="24" height="24" className="mr-05" />
						</div>
					</div>
					<button type="button" className="btn w-100 mt-1-05">
						Login
					</button>
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
