
import { useState } from "react";
import { MessageSquare, Mic, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages] = useState([
    { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" },
    { role: "user", content: "Show me a summary of my next appointment" },
    { role: "assistant", content: "Your next appointment is with John Doe at 2:00 PM. Would you like me to prepare a quick summary of their recent visits?" }
  ]);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-96 h-[600px] p-4 shadow-xl flex flex-col animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input placeholder="Ask me anything..." className="flex-1" />
            <Button variant="ghost" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Button variant="secondary" size="sm">
              📋 Summarize patient history
            </Button>
            <Button variant="secondary" size="sm">
              📅 Schedule follow-up
            </Button>
            <Button variant="secondary" size="sm">
              📝 Draft note
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
