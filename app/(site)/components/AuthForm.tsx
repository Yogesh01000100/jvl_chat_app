"use client"
import React, { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast/headless';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { AiFillGithub } from 'react-icons/ai';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status == 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router]);

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
            <div className="bg-white p-8 shadow-md rounded-md text-center w-2/3 m-auto">
                <h1 className="text-2xl font-semibold mb-4">Welcome to Juice Box Chats!</h1>
                <p className="text-gray-600 mb-4 md:w-[70%] mx-auto">Start chatting and connecting with friends and colleagues.</p>

                <div className='flex flex-row justify-center text-center'>
                    {isLoading ? (
                        <ClipLoader color="#2474dd" loading={isLoading} />
                    ) : (
                        <Button
                            disabled={isLoading}
                            onClick={handleGitHubLogin}
                        >
                            <AiFillGithub className="inline-block mr-2 h-[23px] w-[23px]" /> <div className='m-auto'>Sign In with GitHub</div>
                        </Button>
                    )}
                </div>

                <div className='text-gray-600 text-xs mt-4'>Developed By D.Yogesh</div>
            </div>
        </div>
    );
};

export default AuthForm;
