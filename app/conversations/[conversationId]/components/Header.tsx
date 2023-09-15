"use client"

import Profile from "@/app/components/Profile";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";

interface Props {
    conversation: Conversation & {
        users: User[]
    }
};

const Header: React.FC<Props> = ({ conversation }) => {
    const otherUser=useOtherUser(conversation);

    const statusText=useMemo(()=>{
        return 'online'
    },[conversation]); 
    return (
        <div className="bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
        ">
            <div className="flex gap-3 items-center">
                <Link className="lg:hidden
                block
                text-sky-500
                hover:text-sky-600
                transition
                cursor-pointer" href='/conversations'>
                    <HiChevronLeft size={30}/> 
                </Link>
                <Profile user={otherUser}/>
                <div className="flex flex-col">
                    <div>
                        {otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-400">
                        {statusText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;