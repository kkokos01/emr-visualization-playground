
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, Search, Star, 
  Inbox, Send, Archive, Trash2, 
  Plus 
} from "lucide-react";

const Messages = () => {
  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Smith",
      subject: "Patient Consultation Follow-up",
      preview: "Regarding the patient we discussed yesterday...",
      time: "10:30 AM",
      unread: true,
      starred: true,
    },
    {
      id: 2,
      sender: "Nurse Johnson",
      subject: "Lab Results Available",
      preview: "The lab results for patient #12345 are ready for review.",
      time: "Yesterday",
      unread: false,
      starred: false,
    },
    // Add more message examples
  ];

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-6">
      <Card className="w-64 p-4 flex flex-col gap-4">
        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Compose
        </Button>
        
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Inbox className="h-4 w-4" />
            Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Star className="h-4 w-4" />
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Send className="h-4 w-4" />
            Sent
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Trash2 className="h-4 w-4" />
            Trash
          </Button>
        </div>
      </Card>

      <div className="flex-1 flex flex-col gap-4">
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search messages..." />
          </div>
        </Card>

        <Card className="flex-1 p-4 overflow-auto">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg hover:bg-muted cursor-pointer ${
                  message.unread ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                          {message.sender}
                        </span>
                        {message.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground">{message.preview}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
