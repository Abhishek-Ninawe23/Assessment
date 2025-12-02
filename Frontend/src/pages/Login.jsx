import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ identifier: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser(form));
        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Login successful!");
            navigate("/kanban")
        } else {
            toast.error(res.payload || "Login failed");
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

                <form onSubmit={submit} className="space-y-5">
                    {/* Email or Username */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email or Username</label>
                        <input
                            name="identifier"
                            value={form.identifier}
                            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email or username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-lg
                       hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center mt-6 text-gray-600">
                    New user?{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login