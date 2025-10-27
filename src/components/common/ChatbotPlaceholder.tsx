"use client";
import React, { useState } from 'react';
import { ChatIcon } from '@/icons/index'; // Assuming ChatIcon is available here

const ChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-brand-500 text-white p-4 rounded-full shadow-lg cursor-pointer z-50 flex items-center justify-center w-14 h-14"
        aria-label="Open Chatbot"
      >
        <ChatIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50">
          <div className="bg-brand-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chatbot</h3>
            <button onClick={toggleChat} className="text-white">
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <p>Hello! How can I help you today?</p>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPlaceholder;
