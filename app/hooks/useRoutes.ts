import { useMemo } from "react";
import {HiChat} from "react-icons/hi";

import {

    HiArrowLeftOnReactangle,
    HiUsers
} from "react-icons/hi2";

import {signOut} from "next-auth/react";
import useConversation from "./useConversation";
import { usePathname } from "next/navigation";

const useRoutes=()=>{

    const pathname=usePathname();
    const {conversationId}=useConversation();
    const routes=useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icons:'HiChat',
            active:pathname=='./conversations' || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname=='/users'
        },{
            label:'Logout',
            href:'#',
            onClick:()=>signOut(),
            icon:HiArrowLeftOnReactangle
        }
    ],[pathname,conversationId]);
}