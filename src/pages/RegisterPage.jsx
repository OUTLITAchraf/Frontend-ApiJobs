import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Lock, Briefcase, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../features/AuthSlice';

const schema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    password_confirmation: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    role: yup.string()
        .required('Please select a role')
        .oneOf(['user', 'employer'], 'Invalid role selected')
});

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state)=>state.auth.userRegister);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    console.log({ status, error });
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(userRegister(data))
            if (status==='succeeded' && !error) {
                navigate('/login')
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join our job search platform today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                {...register('name')}
                                type="text"
                                className={`w-full pl-11 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                                placeholder="Enter your full name"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

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
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                {...register('password_confirmation')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={`w-full pl-11 pr-12 py-3 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
                        )}
                    </div>

                    {/* Role Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="relative cursor-pointer">
                                <input
                                    {...register('role')}
                                    type="radio"
                                    value="user"
                                    className="peer sr-only"
                                />
                                <div className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg peer-checked:border-indigo-600 peer-checked:bg-indigo-50 transition">
                                    <User className="w-5 h-5 mr-2 text-gray-600 peer-checked:text-indigo-600" />
                                    <span className="font-medium text-gray-700 peer-checked:text-indigo-600">User</span>
                                </div>
                            </label>
                            <label className="relative cursor-pointer">
                                <input
                                    {...register('role')}
                                    type="radio"
                                    value="employer"
                                    className="peer sr-only"
                                />
                                <div className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg peer-checked:border-indigo-600 peer-checked:bg-indigo-50 transition">
                                    <Briefcase className="w-5 h-5 mr-2 text-gray-600 peer-checked:text-indigo-600" />
                                    <span className="font-medium text-gray-700 peer-checked:text-indigo-600">Employer</span>
                                </div>
                            </label>
                        </div>
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status == 'loading'}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status == 'loading' ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}