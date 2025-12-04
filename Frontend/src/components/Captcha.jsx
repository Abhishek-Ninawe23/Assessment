import React, { useEffect, useState } from 'react'
import api from "../api/axiosInstance.js"


const Captcha = ({ form, setForm }) => {

    //Captcha states
    const [captchaText, setCaptchaText] = useState("");

    //load captcha from backend
    const loadCaptcha = async () => {
        try {

            const res = await api.get("auth/captcha");
            setCaptchaText(res.data.captchaText);
            setForm((prev) => ({ ...prev, captcha: "", captchaToken: res.data.captchaToken })) //clear input

        } catch (error) {
            console.error("Failed to load captcha", err);
            toast.error("Could not load captcha");
        }
    };

    //load captcha on component mount
    useEffect(() => {
        loadCaptcha();
    }, [])


    return (
        <>
            {/* Captcha Display*/}
            <label className="block text-gray-700 font-medium mb-1">
                Captcha
            </label>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                <div className="px-4 py-1 bg-gray-200 rounded-lg font-mono text-lg tracking-[0.rem] select-none shadow-sm">
                    {captchaText || "......"}
                </div>

                <button
                    type="button"
                    onClick={loadCaptcha}
                    className="text-sm px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                    Refresh
                </button>
            </div>

            {/* Captcha Input */}
            <input
                type="text"
                name="captcha"
                value={form.captcha}
                onChange={(e) => setForm({ ...form, captcha: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Type the text shown above"
            />
        </>
    )
}

export default Captcha