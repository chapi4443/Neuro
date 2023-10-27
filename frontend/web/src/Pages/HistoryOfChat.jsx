import React from 'react'
import ChatSidebar from '../Components/Client/ChatLayout/ChatSidebar'
import ChatHistory from '../Components/Client/ChatLayout/ChatHistory'

const HistoryOfChat = () => {
  return (
    <ChatSidebar>
        <ChatHistory />
    </ChatSidebar>
  )
}

export default HistoryOfChat