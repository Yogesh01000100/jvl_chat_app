"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConversationBox from "./ConversationBox";
import { pusherClient } from "@/app/libs/pusher";
import { useSession } from "next-auth/react";
import { find } from "lodash";


interface Props {
    initialItems: FullConversationType[];
}

const ConversationList: React.FC<Props> = ({ initialItems }) => {
    
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
    const session=useSession();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
      }, [session.data?.user?.email])
    
      useEffect(() => {
        if (!pusherKey) {
          return;
        }
    
        pusherClient.subscribe(pusherKey);
    
        const updateHandler = (conversation: FullConversationType) => {
          setItems((current) => current.map((currentConversation) => {
            if (currentConversation.id === conversation.id) {
              return {
                ...currentConversation,
                messages: conversation.messages
              };
            }
    
            return currentConversation;
          }));
        }
    
        const newHandler = (conversation: FullConversationType) => {
          setItems((current) => {
            if (find(current, { id: conversation.id })) {
              return current;
            }
    
            return [conversation, ...current]
          });
        }
    
        const removeHandler = (conversation: FullConversationType) => {
          setItems((current) => {
            return [...current.filter((convo) => convo.id !== conversation.id)]
          });
        }
    
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:remove', removeHandler)
      }, [pusherKey, router]);

      
    return (
        <aside className={clsx(`
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}>


            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>

                </div>
                <div>
                    {items.map((item) => (

                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId == item.id} />
                    ))}
                </div>
            </div>

        </aside>
    );
}

export default ConversationList;