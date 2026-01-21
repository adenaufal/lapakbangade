import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, LogIn, LogOut, Loader2 } from 'lucide-react';

interface LoginButtonProps {
    variant?: 'default' | 'compact' | 'mobile';
    className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
    variant = 'default',
    className = ''
}) => {
    const { user, isLoading, isAuthenticated, login, logout } = useAuth();

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
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                {variant !== 'compact' && (
                    <div className="flex items-center gap-2">
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
                        <span className="text-sm font-medium text-gray-700 hidden lg:block">
                            {user.name?.split(' ')[0]}
                        </span>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    {variant === 'mobile' && <span>Logout</span>}
                </button>
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
