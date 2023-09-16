'use client';

import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Profile from "@/app/components/Profile";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data,
}) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email;

  const container = clsx('flex gap-1 p-4 mr-3', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2 pt-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden', 
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-300', 
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
    !isOwn ? 'rounded-tl-none' : 'rounded-tr-none'
  );
  

  return ( 
    <div className={container}>
      <div className={avatar}>
        <Profile user={data.sender} />
      </div>
      <div className={body}>
        <div className={message}>
         {data.body}
        </div>
        <div className="flex items-center gap-1">
          <div className="text-xs text-gray-400 ml-2">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default MessageBox;