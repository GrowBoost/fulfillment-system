"use client";

import React, { useState, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'agent' | string; // sender can be user, agent, or employee name
}

interface ChatContact {
  id: string;
  name: string;
  type: 'employee' | 'group';
  members?: string[]; // For groups
}

const employees: ChatContact[] = [
  { id: 'emp1', name: 'Mitarbeiter A', type: 'employee' },
  { id: 'emp2', name: 'Mitarbeiter B', type: 'employee' },
  { id: 'emp3', name: 'Mitarbeiter C', type: 'employee' },
];

const initialGroups: ChatContact[] = [
  { id: 'group1', name: 'Team Marketing', type: 'group', members: ['emp1', 'emp2'] },
];

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState<ChatContact[]>([...employees, ...initialGroups]);
  const [activeChatId, setActiveChatId] = useState<string | null>(contacts.length > 0 ? contacts[0].id : null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedEmployeeForNewChat, setSelectedEmployeeForNewChat] = useState<string | null>(null);

  useEffect(() => {
    // Initialize messages for new contacts if they don't exist
    contacts.forEach(contact => {
      if (!messages[contact.id]) {
        setMessages(prev => ({ ...prev, [contact.id]: [] }));
      }
    });
  }, [contacts, messages]);

  const handleStartNewChat = () => {
    if (selectedEmployeeForNewChat) {
      const employeeContact = employees.find(emp => emp.id === selectedEmployeeForNewChat);
      if (employeeContact) {
        // Check if chat with this employee already exists
        const existingContact = contacts.find(c => c.id === employeeContact.id && c.type === 'employee');
        if (!existingContact) {
          setContacts(prev => [...prev, employeeContact]);
          setMessages(prev => ({ ...prev, [employeeContact.id]: [] }));
        }
        setActiveChatId(employeeContact.id);
        setShowNewChatModal(false);
        setSelectedEmployeeForNewChat(null);
      }
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && activeChatId) {
      const newMessage: Message = { text: input, sender: 'user' };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMessage],
      }));
      setInput('');

      // Simulate agent response for employee chats
      const activeContact = contacts.find(c => c.id === activeChatId);
      if (activeContact && activeContact.type === 'employee') {
        setTimeout(() => {
          const agentResponse: Message = { text: `Hello from ${activeContact.name}! How can I help you?`, sender: activeContact.name };
          setMessages(prev => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), agentResponse],
          }));
        }, 1000);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && activeChatId) {
      const file = event.target.files[0];
      const newMessage: Message = { text: `File uploaded: ${file.name}`, sender: 'user' };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMessage],
      }));
      console.log('Uploaded file:', file);
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedGroupMembers.length > 0) {
      const newGroupId = `group${contacts.length + 1}`;
      const newGroup: ChatContact = {
        id: newGroupId,
        name: newGroupName,
        type: 'group',
        members: selectedGroupMembers,
      };
      setContacts([...contacts, newGroup]);
      setMessages(prev => ({ ...prev, [newGroupId]: [] }));
      setShowGroupModal(false);
      setNewGroupName('');
      setSelectedGroupMembers([]);
      setActiveChatId(newGroupId); // Automatically switch to the new group chat
    }
  };

  const currentChatMessages = activeChatId ? messages[activeChatId] || [] : [];

  return (
    <div className="flex h-full bg-white dark:bg-white/[0.03] shadow-md rounded-2xl">
      {/* Left Sidebar for Contacts and Groups */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="w-1/2 bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Neuer Chat
            </button>
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-1/2 bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Gruppe erstellen
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                activeChatId === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => setActiveChatId(contact.id)}
            >
              <h4 className="font-medium text-gray-900 dark:text-white">{contact.name}</h4>
              {contact.type === 'group' && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gruppe ({contact.members?.length} Mitglieder)
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {activeChatId ? contacts.find(c => c.id === activeChatId)?.name : 'Select a chat'}
          </h3>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {activeChatId ? (
            currentChatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {msg.sender !== 'user' && <strong className="mr-1">{msg.sender}:</strong>}
                  {msg.text}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Wählen Sie einen Chat aus oder erstellen Sie eine neue Gruppe.
            </p>
          )}
        </div>
        {activeChatId && (
          <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg mr-2">
              Upload File
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            <button
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        )}
      </div>

      {/* Group Creation Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Neue Gruppe erstellen</h3>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Gruppenname"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Mitglieder auswählen:</h4>
              {employees.map((emp) => (
                <div key={emp.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={emp.id}
                    checked={selectedGroupMembers.includes(emp.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGroupMembers([...selectedGroupMembers, emp.id]);
                      } else {
                        setSelectedGroupMembers(selectedGroupMembers.filter((id) => id !== emp.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={emp.id} className="text-gray-900 dark:text-white">{emp.name}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowGroupModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                Abbrechen
              </button>
              <button
                onClick={handleCreateGroup}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Neuen Chat starten</h3>
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Mitarbeiter auswählen:</h4>
              {employees.map((emp) => (
                <div key={emp.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`new-chat-${emp.id}`}
                    name="newChatEmployee"
                    checked={selectedEmployeeForNewChat === emp.id}
                    onChange={() => setSelectedEmployeeForNewChat(emp.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`new-chat-${emp.id}`} className="text-gray-900 dark:text-white">{emp.name}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewChatModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                Abbrechen
              </button>
              <button
                onClick={handleStartNewChat}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg"
                disabled={!selectedEmployeeForNewChat}
              >
                Chat starten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
