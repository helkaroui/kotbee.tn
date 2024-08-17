import * as React from "react"
import { getReplies } from "@/db/queries";
import MessagesWidget from "./(components)/messages-widget";

export default async function Page() {
  const replies = await getReplies();

  if(!replies) {
    return <div>No messages yet !</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 w-[700px] mx-auto justify-start items-start">
      <MessagesWidget replies={replies} />      
    </div>
  );
}

