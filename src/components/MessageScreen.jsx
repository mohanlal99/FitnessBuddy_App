import React, { useState } from "react";
import { Search, Send, MoveHorizontal as MoreHorizontal } from "lucide-react";

export default function MessagesScreen() {
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Alex Johnson",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      lastMessage: "Great workout today! Ready for tomorrow?",
      timestamp: "2m ago",
      unreadCount: 2,
      online: true,
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      lastMessage: "Let's try that new gym tomorrow",
      timestamp: "1h ago",
      unreadCount: 0,
      online: false,
    },
  ];

  const groupChats = [
    {
      id: 1,
      name: "Morning Runners",
      image:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=150",
      lastMessage: "Sarah: See you all at 6 AM!",
      timestamp: "10m ago",
      memberCount: 5,
      unreadCount: 3,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-6 mt-6 space-y-10">
        <div className="flex items-center bg-white p-3 rounded-xl shadow">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="ml-3 flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Group Chats */}
       <div className="grid grid-cols-7 gap-3">
         <div className="bg-white rounded-2xl shadow p-4 col-span-5">
            
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-900">Alex Johnson</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <MoreHorizontal size={20} className="text-gray-500" />
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-gray-100 rounded-xl p-3 max-w-sm text-sm">
              <p className="text-gray-800">Hey! How was your workout today?</p>
              <span className="text-xs text-gray-400">2:30 PM</span>
            </div>
            <div className="bg-blue-600 text-white rounded-xl p-3 max-w-sm ml-auto text-sm">
              <p>Great! Did 5K run in 25 minutes. Personal best! 🏃‍♀️</p>
              <span className="text-xs text-blue-200">2:32 PM</span>
            </div>
            <div className="bg-gray-100 rounded-xl p-3 max-w-sm text-sm">
              <p className="text-gray-800">
                Awesome! Want to run together tomorrow morning?
              </p>
              <span className="text-xs text-gray-400">2:35 PM</span>
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center border-t mt-4 pt-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none mr-2"
            />
            <button className="bg-blue-600 p-2 rounded-full">
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
        <div className="col-span-2">
         <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Group Chats
          </h2>
          <div className="space-y-4">
            {groupChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center bg-white rounded-xl p-4 shadow relative">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-sm text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-500">
                    {chat.memberCount} members
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Direct Messages
          </h2>
          <div className="space-y-4">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center bg-white rounded-xl p-4 shadow relative">
                <div className="relative mr-4">
                  <img
                    src={chat.image}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-sm text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
       </div>

        {/* Chat Interface Preview */}
        
       
       </div>
      </div>
    </div>
  );
}
