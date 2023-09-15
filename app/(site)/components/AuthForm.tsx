"use client"

import React, { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast/headless';
import { useRouter } from 'next/navigation';


const AuthForm = () => {
    const session = useSession();
    const router=useRouter();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (session?.status == 'authenticated') {
            console.log("Authenticated!");
            router.push('/users')
        }
    }, [session?.status,router]);

    const handleGitHubLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("github");
            toast.success("Logged in!");
            router.push('/users')
        } catch (error) {
            toast.error("Failed to login!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-80">
                <h1 className="text-2xl font-semibold mb-4">Welcome to Juice Box Chats!</h1>
                <p className="text-gray-600 mb-4">Start chatting and connecting with friends and colleagues.</p>
                <Button
                    disabled={isLoading}
                    fullWidth
                    onClick={handleGitHubLogin}
                >
                    Sign In with GitHub
                </Button>
            </div>
        </div>
    );
};

export default AuthForm;
