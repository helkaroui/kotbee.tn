"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import { getRepliesType } from "@/db/queries";
import { cn } from "@/lib/utils";
import moment from "moment";
import { messages } from "@/db/schema";
import useSWR from 'swr';

type Props = {
  replies: getRepliesType;
};

export default function MessagesWidget({ replies }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const userId = useMemo(() => replies[0].userId, [replies]);

  useEffect(() => {
    // Fetch

    // Cleanup

    return () => {
      // Cleanup
    };
  }, [selected]);

  if (!replies || !replies.length) {
    return (
      <div className="w-full flex flex-row justify-center items-center gap-x-2">
        <div>ليس لديك رسائل في الوقت الحالي.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row gap-x-2">
      <div className="basis-1/3 flex flex-col justify-center items-center gap-y-2">
        <ScrollArea className="w-full rounded-md border"
          style={{ height: "calc(100vh - 150px)" }}
          dir="rtl"
        >
          {
            replies.map((reply) => (
              <div key={reply.replyId}>
                <ReplyCard
                  reply={reply}
                  selected={selected === reply.replyId}
                  onClick={() => setSelected(reply.replyId)}
                />
                <Separator />
              </div>
            ))
          }
        </ScrollArea>
      </div>

      <div className="basis-2/3 relative bg-slate-100 rounded-lg p-2">

        {!selected && (
          <div className="w-full flex flex-row justify-center items-center">
            حدد رسالة لعرضها
          </div>
        )}

        {selected && (
          <MessageCard userId={userId} replyId={selected} />
        )}

        <div className="absolute bottom-0 left-0 w-full">
          <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Label htmlFor="message" className="sr-only">
              الرسالة
            </Label>
            <Textarea
              id="message"
              placeholder="اكتب رسالتك هنا..."
              className="min-h-12 resize-none border-0 rounded-none p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex flex-row w-full justify-center items-center py-2">
              <Button type="submit" variant="golden" size="sm">
                إرسال الرسالة
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


type ReplyCardProps = {
  reply: getRepliesType[0];
  selected: boolean;
  onClick?: () => void;
};

const ReplyCard = ({ reply, selected, onClick }: ReplyCardProps) => {
  moment.locale("ar-tn");

  return (
    <div className={cn(
      "w-full min-h-20 hover:cursor-pointer hover:bg-slate-100 flex flex-col p-2",
      selected && "bg-slate-200"
    )}
      onClick={onClick}
    >
      <div className="w-full flex flex-row justify-between items-start">
        <div className="text-xl font-bold">{reply.adOwner.fullName}</div>
        <div className="text-sm font-thin">{moment(reply.createdAt).fromNow()}</div>
      </div>
      <div className="text-sm font-light truncate max-w-[200px]">
        {reply.ad.title}
      </div>
    </div>
  );
}

type MessageCardProps = {
  userId: string;
  replyId: number;
};

const fetcher = (url: string) => fetch(url).then(r => r.json()).then((data) => data as typeof messages.$inferSelect[])
const MessageCard = ({ userId, replyId }: MessageCardProps) => {
  moment.locale("ar-tn");
  const { data, error } = useSWR(`/api/messages/${replyId}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (data) return (
    <>
      {
        data.map((message) =>
          <div 
              key={message.messageId} 
              className={cn(
                "w-full flex flex-row justify-start",
                message.senderId === userId ? "justify-start" : "justify-end"
              )}
                
            >
            <div className="p-2 bg-white m-1 rounded-xl border border-slate-200">
              {message.content}
              <p className="text-xs font-extralight ">
                {moment(message.createdAt).locale("ar-tn").fromNow()}
              </p>
            </div>
          </div>
        )
      }
    </>
  );

}
