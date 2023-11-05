import React, { useState, useEffect } from "react"
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import { useDispatch, useSelector } from "react-redux";
import { getMessagesHistoryThunk, clearMessagesHistoryThunk, sendMessageThunk } from "../../redux/thunk/aiChatBotThunk";
import { sendMessage, clearMessagesHistory } from "../../redux/slice/aiChatBotSlice"

const AIChatBot = () => {
    const [showChatbot, toggleChatbot] = useState(false);

    const { loading } = useSelector((state) => state.aiChatBotSlice);
    const { messages } = useSelector((state) => state.aiChatBotSlice);
    const dispatch = useDispatch();

    const handleClickChatbotButton = () => {
        if (!showChatbot && messages.length === 0) {
            dispatch(getMessagesHistoryThunk({ skip: 0, limit: 10 }, {}));
        }
        toggleChatbot(!showChatbot);
    };

    const handleSend = async (message) => {
        if (message === "!clear") {
            dispatch(clearMessagesHistory());
            dispatch(clearMessagesHistoryThunk());
        } else {
            dispatch(sendMessage(message));
            dispatch(sendMessageThunk(message));
        }
    };

    return (
        <div>
            <button className="appChatbotButton" onClick={handleClickChatbotButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="appChatbotButtonIcon">
                    <path d="M192 408h64v-48h-64zm384-216h-32a96 96 0 00-96-96H344V24a24 24 0 00-48 0v72H192a96 96 0 00-96 96H64a48 48 0 00-48 48v128a48 48 0 0048 48h32a96 96 0 0096 96h256a96 96 0 0096-96h32a48 48 0 0048-48V240a48 48 0 00-48-48zM96 368H64V240h32zm400 48a48.14 48.14 0 01-48 48H192a48.14 48.14 0 01-48-48V192a48 48 0 0148-48h256a48 48 0 0148 48zm80-48h-32V240h32zM240 208a48 48 0 1048 48 47.996 47.996 0 00-48-48zm160 0a48 48 0 1048 48 47.996 47.996 0 00-48-48zm-16 200h64v-48h-64zm-96 0h64v-48h-64z"></path>
                </svg>
            </button>
            {showChatbot &&
                <div className="appChatbotContainer">
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                typingIndicator={loading ? <TypingIndicator content="AI Chatbot is typing..." /> : null}
                            >
                                {messages.map((message, index) => {
                                    return <Message key={index} model={message} />
                                })}
                            </MessageList>
                            <MessageInput
                                style={{ width: "400px" }}
                                placeholder="Type message here"
                                onSend={handleSend}
                                sendDisabled={loading}
                                sendOnReturnDisabled={loading}
                                autoFocus={true}
                                attachButton={false}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            }
        </div >
    )
}

export default AIChatBot;
