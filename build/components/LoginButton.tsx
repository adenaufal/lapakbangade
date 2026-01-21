import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, LogOut, Loader2, LayoutDashboard, ChevronDown } from 'lucide-react';

interface LoginButtonProps {
    variant?: 'default' | 'compact' | 'mobile';
    className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
    variant = 'default',
    className = ''
}) => {
    const { user, isLoading, isAuthenticated, login, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (isLoading) {
        return (
            <button
                disabled
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-wait ${className}`}
            >
                <Loader2 size={18} className="animate-spin" />
                {variant !== 'compact' && <span>Loading...</span>}
            </button>
        );
    }

    if (isAuthenticated && user) {
        if (variant === 'mobile') {
            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-3 px-2 py-2">
                        {user.picture ? (
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border-2 border-brand-200"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                                <User size={16} className="text-brand-600" />
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                            {user.name}
                        </span>
                    </div>
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-600 bg-brand-50 mx-2"
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium w-full text-left mx-2"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            );
        }

        return (
            <div className={`relative ${className}`} ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                    {user.picture ? (
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border-2 border-brand-200"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                            <User size={16} className="text-brand-600" />
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden lg:block max-w-[100px] truncate">
                        {user.name?.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>

                        <div className="p-1">
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard size={16} />
                                Dashboard
                            </Link>

                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition-colors mt-1"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Not authenticated - show login button
    if (variant === 'mobile') {
        return (
            <button
                onClick={login}
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-all text-gray-700 font-medium ${className}`}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                <span>Login dengan Google</span>
            </button>
        );
    }

    return (
        <button
            onClick={login}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border-2 border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-all text-gray-700 font-medium text-sm shadow-sm ${className}`}
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
            {variant !== 'compact' && <span>Login</span>}
        </button>
    );
};
