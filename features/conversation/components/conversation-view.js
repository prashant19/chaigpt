"use client";

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useChat } from "@ai-sdk/react";
import { ChatEmpty } from './chat-empty';
import { ChatMessages } from './chat-messages';
import { ChatComposer } from './chat-composer';

/**
 * Main chat view — header, message list (or empty state), and composer with streaming.
 */
export const ConversationView = ({ conversationId, initialMessages = [] }) => {
    const { messages, append, status } = useChat({
        id: conversationId,
        initialMessages,
        api: "/api/chat",
        onError: (error) => {
            console.error(error);
        },
    });

    const title = "Chat";

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col">
            <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mx-1 h-4" />
                <h1 className="truncate text-sm font-medium">{title}</h1>
            </header>

            {messages.length === 0 ? (
                <ChatEmpty />
            ) : (
                <ChatMessages messages={messages} status={status} />
            )}

            <ChatComposer
                onSend={(text) => {
                    void append({ role: "user", content: text });
                }}
                isSending={status === "loading" || status === "submitted"}
                autoFocus
            />
        </div>
    );
};