import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ name: "", username: "", email: "", password: "", phone: "" });

    const submit = async (e) => {
        e.preventDefault();
        const res = await dispatch(registerUser(form));
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/kanban");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={submit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                            <span className="text-red-500 text-xs align-top" >*</span>
                        </label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Username
                            <span className="text-red-500 text-xs align-top" >*</span>

                        </label>
                        <input
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                            <span className="text-red-500 text-xs align-top" >*</span>

                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                            <span className="text-red-500 text-xs align-top" >*</span>

                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Choose a strong password"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Phone (optional)
                        </label>
                        <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="9876543210"
                        />
                    </div>

                    {/* Register Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={loading}
                        sx={{
                            mt: 1,
                            py: 1,
                            backgroundColor: "#2563EB",
                            "&:hover": { backgroundColor: "#1D4ED8" },
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 text-center text-red-600 font-medium bg-red-100 p-2 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Footer */}
                <p className="text-center mt-6 text-gray-600">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
