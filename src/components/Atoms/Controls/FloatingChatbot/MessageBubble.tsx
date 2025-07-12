import { tv } from "tailwind-variants";
import { ChatMessage } from "./hooks/useChatbot";

const bubble = tv({
  base: ["px-4", "py-2", "rounded-xl", "max-w-[80%]", "body-3", "shadow-sm"],
  variants: {
    type: {
      user: "self-end bg-primary-400 bg-opacity-70 text-white",
      bot: "self-start bg-white bg-opacity-10 text-white",
    },
  },
});

export const MessageBubble = ({ msg }: { msg: ChatMessage }) => (
  <div className={bubble({ type: msg.isUser ? "user" : "bot" })}>
    {msg.content}
  </div>
);
