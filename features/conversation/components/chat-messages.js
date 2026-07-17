"use client";

import { isTextUIPart } from "ai";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Spinner } from "@/components/ui/spinner";

/** Extracts plain text from a `UIMessage` by joining all text parts. */
function getMessageText(message) {
  if (typeof message.parts === "undefined") {
    return message.content || "";
  }
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

/**
 * Renders the conversation message list with bubble responses and a loading indicator.
 */
export function ChatMessages({ messages, status }) {
  const isWaiting =
    status === "submitted" && messages.at(-1)?.role === "user";

  return (
    <div className="flex-1 overflow-y-auto py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 md:px-6">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <Message key={message.id} align={isUser ? "end" : "start"}>
              <MessageContent>
                <Bubble variant={isUser ? "muted" : "ghost"}>
                  <BubbleContent className="whitespace-pre-wrap">
                    {getMessageText(message)}
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          );
        })}

        {isWaiting ? (
          <Message align="start">
            <MessageContent>
              <Bubble variant="ghost">
                <BubbleContent>
                  <Spinner className="size-4 animate-spin text-muted-foreground" />
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        ) : null}
      </div>
    </div>
  );
}