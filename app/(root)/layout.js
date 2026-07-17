
import { ChatShell } from '@/features/conversation/components/chat-shell';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { onBoardUser } from '@/features/action/user-fetch';

/**
 * Authenticated app layout — protects routes, syncs user to DB, and wraps content in `ChatShell`.
 */
const RootGrouplayout = async ({ children }) => {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userId = user.id;
  const email = user.emailAddresses?.find(e => e.verification.status === "verified")?.emailAddress || null;
  const firstName = user.firstName || null;
  const lastName = user.lastName || null;
  const imageUrl = user.imageUrl || null;


  await onBoardUser(
    userId,
    email,
    firstName,
    lastName,
    imageUrl
  )







  return (
    <ChatShell>
      {children}
    </ChatShell>
  );

};
export default RootGrouplayout;