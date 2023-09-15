"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props{
    initialItems:FullConversationType[];
}

const ConversationList:React.FC<Props>=({initialItems})=>{

    const [items, setItems]=useState(initialItems);
    const router=useRouter();

    const {conversationId, isOpen}=useConversation();
    return (
        <aside 
        className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
        isOpen?'hidden':'block w-full left-0'
        )}>


        </aside>
    );
}

export default ConversationList;