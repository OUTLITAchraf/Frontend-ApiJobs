import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, Briefcase, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthUser, userLogin } from '../features/AuthSlice';
import Cookies from "js-cookie";


// --- Validation Schema ---
const schema = yup.object().shape({
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: yup.string()
        .required('Password is required')
});

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();    

    const [generalError, setGeneralError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setGeneralError(null);

        try {

            let response = await dispatch(userLogin(data));

            if (response.meta.requestStatus === 'rejected') {
                const errorPayload = response.payload;

                Object.keys(errors).forEach(key => setError(key, null));

                if (errorPayload && errorPayload.errors) {
                    const backendErrors = errorPayload.errors;

                    Object.keys(backendErrors).forEach(fieldName => {
                        if (['email', 'password'].includes(fieldName)) {
                            setError(fieldName, {
                                type: 'server',
                                message: backendErrors[fieldName][0],
                            });
                        }
                    });

                    if (errorPayload.message) {
                        setGeneralError(errorPayload.message);
                    }

                } else if (errorPayload && errorPayload.message) {
                    setGeneralError(errorPayload.message);
                } else {
                    setGeneralError("Login failed due to an unknown error.");
                }

            } else if (response.meta.requestStatus === 'fulfilled') {
                const userResponse = await dispatch(fetchAuthUser());

                if (userResponse.meta.requestStatus === "fulfilled") {
                    
                    const user = userResponse.payload;
                    const role = user.roles?.[0]?.name;

                    Cookies.set("authUser", JSON.stringify(user), {
                    expires: 7,
                    sameSite: "strict",
                    });

                    if (role === "employer") {
                    navigate("/dashboard-emloyer");
                    } else {
                    navigate("/offers");
                    }
                }
            }
        } catch (error) {
            console.error("Client-side error during login:", error);
            setGeneralError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full transform transition duration-500 hover:shadow-3xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-lg">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to continue to your dashboard</p>
                </div>

                {/* General Error Alert */}
                {generalError && (
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 shadow-sm transition-all" role="alert">
                        <AlertTriangle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                        {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-150`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1" />{errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                className={`w-full pl-11 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-150`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1" />{errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-indigo-600 text-white py-3 mt-6 rounded-lg font-bold shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {status === 'loading' ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
                        Register
                    </a>
                </p>
            </div>
            <style>{`
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: hidden
                }
            `}</style>
        </div>
    );
}
