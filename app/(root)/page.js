import { ConversationView } from "@/features/conversation/components/conversation-view";

export default function Home() {
  return <ConversationView conversationId="default" initialMessages={[]} />;
}
