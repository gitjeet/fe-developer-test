import { useState, useRef, useEffect } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatbot = (
  initialOpen = false,
  defaultMessages: ChatMessage[],
  onSendMessage?: (msg: string) => Promise<string> | string,
) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  const onChange = (v: string) => setInputValue(v);

  const send = async () => {
    if (!inputValue.trim() || isLoading) return;
    const user: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, user]);
    setInputValue("");
    setIsLoading(true);
    try {
      let res = "Preparing Response";
      if (onSendMessage) {
        const r = await onSendMessage(user.content);
        if (r) res = r;
      }
      setTimeout(() => {
        const bot: ChatMessage = {
          id: `bot-${Date.now()}`,
          content: res,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((p) => [...p, bot]);
        setIsLoading(false);
      }, 500);
    } catch {
      const err: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((p) => [...p, err]);
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    toggle,
    onChange,
    send,
  };
};
