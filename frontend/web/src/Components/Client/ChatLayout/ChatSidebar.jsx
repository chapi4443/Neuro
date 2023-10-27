import React from 'react'
import ChatLayout from './ChatLayout'
import { Stack } from '@mui/material'

const ChatSidebar = (props) => {
  return (
    <Stack direction={"row"}>
        <ChatLayout />
        {props.children}
    </Stack>
  )
}

export default ChatSidebar