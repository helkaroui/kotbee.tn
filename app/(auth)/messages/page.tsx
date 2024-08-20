import * as React from "react"
import { getReplies } from "@/db/queries";
import MessagesWidget from "./(components)/messages-widget";
import { ChatLayout } from "@/components/cstm/chat/chat-layout";
import { cookies } from "next/headers";

export default async function Page() {
  const replies = await getReplies();

  if(!replies) {
    return <div>No messages yet !</div>;
  }

  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="flex flex-col justify-start items-start mb-4" dir="ltr">
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />  
    </div>
  );
}

