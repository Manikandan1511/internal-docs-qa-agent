// src/components/Message.jsx

import React from "react";
import { cn } from "@/lib/utils";

function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-2xl max-w-[85%] whitespace-pre-wrap",
        isUser
          ? "bg-primary text-primary-foreground self-end ml-auto"
          : "bg-muted text-muted-foreground self-start mr-auto"
      )}
    >
      {content}
    </div>
  );
}

export default Message;
