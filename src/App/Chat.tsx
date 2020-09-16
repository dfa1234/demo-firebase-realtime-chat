import React, {FC, RefObject, useEffect, useRef, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ChatMessage} from "../types";
import {firestore} from "../utils/firebase";
import styled from "styled-components";
import {Box} from "../utils/Box";
import {Button, TextField} from "@material-ui/core";
import {formatDate} from "../utils/formatDates";


const addMessage = async (newMessage: ChatMessage): Promise<{ newMessage: any }> => {
    const chatMessageInserted = await firestore.collection('chatMessages').add({
        ...newMessage
    })
    return {newMessage: chatMessageInserted};
}

//to scroll at the last message
const scrollToBottom = (ref: any) => {
    // @ts-ignore
    ref.current.scrollTop = ref.current.scrollHeight;
}


export const Chat: FC<any> = ({login = 'newUser'}) => {

    const history = useHistory();
    if (!login) {
        history.push('/')
    }

    let {roomId} = useParams();

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');

    useEffect(() => {
        const unsubscribe = firestore.collection('chatMessages').onSnapshot(snap => {
            const results = snap.docs
                .map(doc => ({
                    ...doc.data(),
                    date: doc.data().date.toDate()
                } as ChatMessage))
                //Clearly not the thing to do but I will only make a client filter for this demo
                .filter(message => message.roomId === roomId)
                .sort((a, b) => (a.date as any as number) - (b.date as any as number))

            //TODO remove, for debug only
            console.log(results)
            setChatMessages(results)
            scrollToBottom(chatWindow)
        })

        return () => unsubscribe()
    }, [roomId])

    let textInput = useRef();
    let chatWindow = useRef();

    const sendMyMessage = () => {
        addMessage({
            message: currentMessage || '',
            date: new Date(),
            // security will be top tier for this demo:
            login,
            roomId
        }).then(result => {
            // @ts-ignore
            textInput.current.value = "";
            scrollToBottom(chatWindow)
        })
    }

    return <MainWrapper>
        <Title>Welcome {login} to room: {roomId}</Title>
        <ChatWindow ref={chatWindow as any as RefObject<HTMLDivElement>}>
            {chatMessages.map((chatMessage: ChatMessage) => {
                return <Bubble
                    alignSelf={chatMessage.login === login ? 'flex-end' : 'flex-start'}
                    backgroundColor={chatMessage.login === login ? '#d7ffd7' : '#dfe9e7'}
                    key={chatMessage.date.toTimeString()}
                >
                    {chatMessage.message}
                    <Author>{chatMessage.login === login ? 'Me' : chatMessage.login} - {formatDate(chatMessage.date)}</Author>
                </Bubble>
            })}

        </ChatWindow>

        <ControlBar>
            <FullWidthField id="outlined-basic" label="Your message" variant="outlined"
                            inputRef={textInput}
                            onKeyPress={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === 'Enter') {
                                    ev.preventDefault();
                                    sendMyMessage();
                                }
                            }}
                            onChange={(event) => setCurrentMessage(event?.target?.value)}/>
            <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{marginLeft: 5}}
                onClick={() => {
                    sendMyMessage();
                }}>
                Enter
            </SubmitButton>
        </ControlBar>


    </MainWrapper>
}

const ChatWindow = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    height: 500,
    overflowY: 'scroll',
    width: 500,
    maxWidth: '90%',
    backgroundColor: 'whitesmoke',
    border: '1px solid lightgray',
    paddingBottom: 60
})


const Bubble = styled(Box)({
    width: 300,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    border: '1px solid lightgray'
})


const FullWidthField = styled(TextField)({
    flex: 1
})

const ControlBar = styled(Box)({
    display: 'flex',
    width: 500,
    maxWidth: '90%',
})


const SubmitButton = styled(Button)({
    width: 100
})


const Title = styled.h2({
    color: 'gray',
    fontFamily: 'sans-serif',
    margin: 0,
    fontSize: 18,
    minWidth: 160,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
})


const Author = styled(Box)({
    display: 'block',
    fontFamily: "monospace",
    fontStyle: "italic",
    fontSize: 12,
    marginTop: 3,
    textAlign: 'right'
})


const MainWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
})
