'use client';
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Profile from "@/app/components/Profile";
import { useEffect, useState } from "react";
import SkeletonLoader from "./Skeleton";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data,
}) => {
  const { data: sessionData } = useSession();
  const isOwn = sessionData?.user?.email === data?.sender?.email;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [sessionData]);


  const container = clsx('flex gap-1 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2 pt-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden', 
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-300', 
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
    !isOwn ? 'rounded-tl-md' : 'rounded-tr-md'
  );


  return ( 
    <div className={container}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
 
export default MessageBox;