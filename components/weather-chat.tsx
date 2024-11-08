"use client";

import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useRef, useEffect } from "react";

export function WeatherChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-sky-500" />
              <h3 className="text-lg font-semibold mb-2">
                Welcome to Weather AI Assistant!
              </h3>
              <p>
                Ask me about weather conditions, forecasts, or any weather-related
                questions. Try something like:
              </p>
              <ul className="mt-2 space-y-1">
                <li>&quot;What&apos;s the weather like today?&quot;</li>
                <li>&quot;Should I bring an umbrella?&quot;</li>
                <li>&quot;What&apos;s the forecast for this weekend?&quot;</li>
              </ul>
            </div>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                className={`p-4 max-w-[80%] ${
                  message.role === "assistant"
                    ? "ml-0 bg-sky-50 dark:bg-sky-900/50"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.role === "assistant" ? (
                    <Bot className="w-5 h-5 mt-1" />
                  ) : (
                    <User className="w-5 h-5 mt-1" />
                  )}
                  <div className="leading-relaxed">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </Card>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex items-center gap-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about the weather..."
          className="flex-1"
        />
        <Button type="submit">
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}