"use client"

import React, { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import "./ScrollBar.css";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };

    pusherClient.bind('messages:new', messageHandler);

    scrollToBottom();

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, [conversationId, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-10" ref={bottomRef} />
    </div>
  );
};

export default Body;
