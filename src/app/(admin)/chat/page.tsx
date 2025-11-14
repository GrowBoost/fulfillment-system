import React from 'react';
import ChatComponent from '../../../components/chat/ChatComponent';
import PageBreadcrumb from '@/components/common/PageBreadCrumb'; // Assuming this path is correct

const ChatPage = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Chat" />
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 flex-grow"> {/* Rounded corners and border like wiki */}
        <ChatComponent />
      </div>
    </>
  );
};

export default ChatPage;
