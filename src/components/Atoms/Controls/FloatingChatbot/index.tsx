import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { tv } from "tailwind-variants";
import { useChatbot, ChatMessage } from "./hooks/useChatbot";
import { MessageBubble } from "./MessageBubble";
import React from "react";

export interface ChatbotProps {
  title?: string;
  placeholderText?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  initialOpen?: boolean;
  onSendMessage?: (message: string) => Promise<string> | string;
  avatar?: React.ReactNode;
  className?: string;
}

const btn = tv({
  base: [
    "w-14",
    "h-14",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "text-white",
    "cursor-pointer",
    "shadow-lg",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "bg-primary-400",
    "hover:bg-primary-500",
    "z-40",
  ],
});

const container = tv({
  base: [
    "flex",
    "flex-col",
    "rounded-2xl",
    "shadow-xl",
    "overflow-hidden",
    "text-white",
    "z-30",
    "backdrop-blur-xl",
    "bg-gradient-to-br",
    "from-[rgba(79,183,221,0.05)]",
    "to-[rgba(79,183,221,0.10)]",
    "border",
    "border-white/10",
  ],
  variants: {
    position: {
      "bottom-right": "right-0 bottom-20",
      "bottom-left": "left-0 bottom-20",
      "top-right": "right-0 top-20",
      "top-left": "left-0 top-20",
    },
  },
  defaultVariants: { position: "bottom-right" },
});

const list = tv({
  base: [
    "flex",
    "flex-col",
    "gap-3",
    "p-4",
    "overflow-y-auto",
    "scrollbar-thin",
    "scrollbar-thumb-white/20",
    "scrollbar-track-transparent",
  ],
});

const inputBox = tv({
  base: [
    "flex",
    "items-center",
    "gap-2",
    "p-3",
    "border-t",
    "border-white/10",
    "bg-white/5",
  ],
});
const inputField = tv({
  base: [
    "flex-1",
    "p-2",
    "rounded-lg",
    "bg-white",
    "bg-opacity-10",
    "text-white",
    "placeholder-white/50",
    "focus:outline-none",
    "focus:ring-1",
    "focus:ring-primary-400",
  ],
});
const sendBtn = tv({
  base: [
    "p-2",
    "rounded-lg",
    "bg-primary-400",
    "text-white",
    "cursor-pointer",
    "hover:bg-primary-500",
    "transition-colors",
    "duration-200",
  ],
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed hover:bg-primary-400",
      false: "",
    },
  },
});

const defaults: ChatMessage[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
];

export const Chatbot: React.FC<ChatbotProps> = ({
  title = "Chat Support",
  placeholderText = "Type your message...",
  position = "bottom-right",
  initialOpen = false,
  onSendMessage,
  avatar,
  className,
}) => {
  const {
    isOpen,
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    toggle,
    onChange,
    send,
  } = useChatbot(initialOpen, defaults, onSendMessage);

  const pos = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }[position];

  return (
    <div className={`fixed ${pos} z-50 ${className || ""}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={container({ position })}
            style={{ width: 350, height: 450 }}
          >
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                {avatar || (
                  <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center">
                    <FiMessageSquare size={16} />
                  </div>
                )}
                <div className="font-medium body-2">{title}</div>
              </div>
              <button
                onClick={toggle}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <IoClose size={20} />
              </button>
            </div>
            <div className={list()} style={{ height: 320 }}>
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
              {isLoading && (
                <div className="self-start bg-white bg-opacity-10 text-white px-4 py-2 rounded-xl max-w-[80%] body-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={inputBox()}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && send()}
                placeholder={placeholderText}
                className={inputField()}
                disabled={isLoading}
                aria-label="Chat message"
              />
              <button
                onClick={send}
                className={sendBtn({
                  disabled: isLoading || !inputValue.trim(),
                })}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
              >
                <IoSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className={btn()}
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        initial={false}
        animate={{ rotate: 0 }}
      >
        {isOpen ? <IoClose size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>
    </div>
  );
};
