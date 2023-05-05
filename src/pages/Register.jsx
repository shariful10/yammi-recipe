import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [showComfirm, setShowComfirm] = useState(false);

	const { user, createUser, updateUserData } = useContext(AuthContext);

	const handleRegister = (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const url = form.url.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		console.log(name, email, url, password, confirm);
		if (password.length < 6) {
			toast.error("Password Must Be Minimum 6 Characters", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}
		if (password !== confirm) {
			toast.error("Password Doesn't Match", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}
		createUser(email, password)
			.then((res) => {
				const createdUser = res.user;
				console.log(createdUser);
				toast.success("Successfully Created", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				updateUserData(createdUser, name, url) // <---- call the updateUserData function with the user and url parameters
					.then(() => {
						console.log("Successfully updated user data");
					})
					.catch((error) => {
						console.log("Error updating user data:", error);
					});
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="my-container">
			<h1 className="text-4xl font-semibold md:text-center mb-5">Please Register</h1>
			<form
				onSubmit={handleRegister}
				className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 md:w-3/5 mx-auto">
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="name">
						Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="name"
						id="name"
						type="text"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="email"
						id="email"
						type="email"
						placeholder="Enter your email"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="url">
						Photo URL
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="url"
						id="url"
						type="url"
						placeholder="Enter your photo URL"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="password">
						<div className="flex justify-between items-center">
							Password
							<span onClick={() => setShowPass(!showPass)} className="mr-2">
								{showPass ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="password"
						id="password"
						type={showPass ? "text" : "password"}
						placeholder="Enter your password"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="password">
						<div className="flex justify-between items-center">
							Confirm Password
							<span onClick={() => setShowComfirm(!showComfirm)} className="mr-2">
								{showComfirm ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="confirm"
						id="confirm"
						type={showComfirm ? "text" : "password"}
						placeholder="Confirm your password"
						required
					/>
				</div>
				<div className="md:flex items-center justify-between">
					<button className="btn-pr-2" type="submit">
						Register
					</button>
					<p className="mt-2 md:mt-0">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-700 underline">
							Login
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Register;
