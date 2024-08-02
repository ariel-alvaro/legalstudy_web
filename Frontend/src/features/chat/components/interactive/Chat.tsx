'use client'
import React, {useContext, useEffect, useRef, useState } from "react"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { BiSend } from "react-icons/bi";
import type { IChat, IChatData, IMessage, IMessageData, IMessageProp } from "@components/chat/interfaces/chat.interface";
import { ChatStatusEnum, MessageOriginEnum, MessageTypeEnum, UserTypeEnum, WebsocketTypeEnum } from "@components/chat/enums/chat.enum";
import { WebSocketHandler } from "@core/utils/websocket";
import { HttpRequest } from "@core/utils/http";
import type { IHttpOptions, IHTTPresponse } from "@core/interfaces/core.interface";
import { HTTPMethodEnum } from "@core/enums/core.enum";
import { FaUserCircle } from "react-icons/fa";


export default function Chat({actual_user, chat_data}: {actual_user:string, chat_data?: IChatData}  ){



    const mainRef = useRef<HTMLElement>(null)
    const inputMessageRef = useRef<HTMLInputElement>(null)
    
    const [open, setOpen] = useState<boolean>(false)
    const [hasDisconnect, setHasDisconnected] = useState(false)
    const [messages, setmessages] = useState<(JSX.Element | null)[]>([]);
    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const [wsHandler, setWsHandler] = useState<WebSocketHandler>(new WebSocketHandler())
    
    useEffect(()=>{
        // Scroll down if new message or open chat
        if(mainRef.current){
            mainRef.current!.scrollTop = mainRef.current!.scrollHeight;
        }
        
    },[messages, open])

    useEffect(() => {
        console.log("helloooo")
        // Set open depending on screen width
        if (innerWidth >= 1024 || actual_user == UserTypeEnum.Admin){
            setOpen(true)
        }
        
        if(actual_user == UserTypeEnum.Admin && chat_data != undefined){
            
            getMessages()
            initializeWebSocket(chat_data.roomID)
            setHasDisconnected(chat_data.status === ChatStatusEnum.Closed)

        }

        if(actual_user == UserTypeEnum.AnonymousUser){
            createChat()
        }

        // return () => {
        //     websocket_service.closeSocket(WebsocketTypeEnum.Chat)
        // }

    },[])

    
    //Functions
    const initializeWebSocket = (uuid: string) => {
        
        const ws_url = `ws://localhost:8088/ws/chat/${uuid}/`;
        wsHandler.setMessageHandler(handleMessage);
        wsHandler.connect(ws_url);

        setChatOpen(true)
    }    


    const  createChat = async () => {
        
        const create_url: string = "http://localhost:8000/api/v1/chat_create"
        const options: IHttpOptions = HttpRequest.generateOptions(create_url, {}) 

        const response: IHTTPresponse<IChat> = await HttpRequest.request<IChat>(HTTPMethodEnum.POST, options)
        
        if (response.status != 201){
            return null
        }
        
        if(response.data){
            initializeWebSocket(response.data.roomID)
        }
        
    }

    const handleMessage = (message: IMessage) => {
        console.log(message)
        if(message.data.user_type != actual_user){

            if (message.data.message_type == MessageTypeEnum.Notification){
                setHasDisconnected(true)
            }
            generateMessage(MessageOriginEnum.Incoming, message.data)
     
        
            
        }

    }
    
    const getMessages = async () => {
        const get_url =  `http://localhost:8000/api/v1/chat_retrieve/${chat_data?.roomID}`

        const options: IHttpOptions = HttpRequest.generateOptions(get_url, {})

        const response: IHTTPresponse<IChat> = await HttpRequest.request<IChat>(HTTPMethodEnum.GET,options, true) 

        
        if(response.status != 200){
            return
        }
        if(response.data){
            restoreMessages(response.data.messages)
        }
        

    }

    const restoreMessages = (messages: IMessageData[]) => {
        let stored_messagesElem: JSX.Element[] = []


        for (let message of messages){
            let origin = MessageOriginEnum.Incoming 
            
            if(message.user_type == UserTypeEnum.Admin){
                origin = MessageOriginEnum.Outgoing
            }

            let messageElem: JSX.Element = <Message origin={origin} message={message}/>
            
            stored_messagesElem.push(messageElem)
        }

        setmessages(stored_messagesElem)
    }

    const generateMessage = (messageOrigin: string, message: IMessageData) => {
   
        
        let messageElem: JSX.Element | null = null
        //console.log("####",messageOrigin, data)
        // Genere only if it's not my user
        if(message.message_type === MessageTypeEnum.Chat){
            messageElem = <Message origin={messageOrigin} message={message}/>
        }
        
        if(message.message_type === MessageTypeEnum.Notification){
            messageElem = <Notification origin={messageOrigin} message={message}/>
            
        }
        
        
        setmessages( prevmessages => [...prevmessages, messageElem])
    }
    
    const sendMessage = (text: string) => {

        let message: IMessageData = {
            user_type: actual_user,
            message_type: MessageTypeEnum.Chat,
            text: text
        }

        generateMessage(MessageOriginEnum.Outgoing ,message)
        wsHandler.socketSendData(WebsocketTypeEnum.Chat,message)
    }


    //Events


    const handleInput = () => {
        
        let text  = inputMessageRef.current!.value

        if (text !== ""){
            sendMessage(inputMessageRef.current!.value)
        }

        inputMessageRef.current!.value = ''
        
        

    }
    //&& chatOpen
    if(actual_user === UserTypeEnum.Admin && chatOpen){
        return(
            <section className={` ${open ? 'slide-up h-full': 'h-auto'} w-full z-50 fixed bottom-0 laptop:static `}>

            {/* Head */}
            <header className={` ${open && innerWidth < 1024 ? "h-[10%]" : "h-10"} w-full bg-slate-500 flex items-center p-7 gap-4 laptop:h-[10%] `}>
                <section className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-red-50">
                            <FaUserCircle className=" w-full h-full"/>
                        </div>
                        <div>
                            <h3 className="text-white text-xl">Cliente: {chat_data?.client_data.name}</h3>
                            <h3 className="text-white text-xl">Telefono:  {chat_data?.client_data.cellphone}</h3>
                        </div>
                </section>
                <span className={`h-3 w-3 rounded-full ${!hasDisconnect ? "bg-green-500" : "bg-red-600" }  opacity-75`}></span>
                    
                <div className="cursor-pointer absolute right-6" onClick={() => {setOpen(!open)}}>   
                    { innerWidth < 1024 ?
                    <div>
                        {open ? <IoIosArrowDown className="h-8 w-8 text-white "/> : <IoIosArrowUp className="h-8 w-8 text-white"/>}
                    </div>: null}
                </div>
                
                
            </header>
            {/* Body */}
            
            {open ?
            <main className={`w-full laptop:h-[80%] h-[85%] bg-slate-700 p-4 overflow-y-auto `} ref={mainRef}>
                {/* <ComponentMap components={messages}/> */}
                {messages.map((elem, index)=>(
                    <div key={index}>
                        {elem}
                    </div>
                ))}
            </main> : null}

            {open ?
            <footer className={`h-[5%] w-full bg-slate-700 flex items-center laptop:h-[10%]`}>
                
                {chat_data?.status != ChatStatusEnum.Closed && ! hasDisconnect ? 
                    (<>
                        <input type="text" className="w-[90%] h-full bg-slate-700 text-white opacity-80 text-laptop border-2 border-zinc-900 px-2" ref={inputMessageRef} 
                        onKeyDown={(e)=>{ if (e.key === "Enter"){ handleInput() }
                        }}/>
                    
                        <div className="w-[10%] h-full bg-slate-600 flex justify-center items-center cursor-pointer" onClick={handleInput} >
                            
                            <BiSend className=" text-stone-800 h-7 w-7"/>
                        </div>
                    </>)
                :null}


            </footer>: null}



        </section>
        )
    }
    
        
    if(chatOpen && actual_user != UserTypeEnum.Admin){
        return(
            <section className={` ${open ? 'slide-up h-full': 'h-auto'} w-full z-50 fixed bottom-0 laptop:right-3 laptop:w-[27rem] laptop:h-auto `}>

                {/* Head */}
                <header className={` ${open ? "h-[10%]" : "h-10"} w-full bg-boxes flex items-center p-7 gap-4 laptop:h-18 `}>
                    <div className="w-10 h-10 rounded-full bg-red-50">
                        <img></img>
                    </div>
                    <h3 className="text-white text-xl">Abogado en linea</h3>
                    <span className="h-3 w-3 rounded-full bg-green-500 opacity-75"></span>
                    
                    <div className="cursor-pointer absolute right-6" onClick={() => {setOpen(!open)}}>   

                        {open ? <IoIosArrowDown className="h-8 w-8 text-white "/> : <IoIosArrowUp className="h-8 w-8 text-white"/>}

                    </div>
                    
                    
                </header>
                {/* Body */}
                
                {open ?
                <main className={`w-full laptop:h-[28rem] h-[85%] bg-secondary p-4 overflow-scroll`} ref={mainRef}>
                    {/* <ComponentMap components={messages}/> */}
                    {messages.map((elem, index)=>(
                        <div key={index}>
                            {elem}
                        </div>
                    ))}
                </main> : null}

                {open ?
                <footer className={`h-[5%] w-full bg-secondary flex items-center laptop:h-9`}>
                    <input type="text" className="w-[90%] h-full bg-secondary text-white opacity-80 text-laptop border-2 border-zinc-900 px-2" ref={inputMessageRef} 
                    onKeyDown={(e)=>{ if (e.key === "Enter"){ handleInput() }
                    }}/>

                    <div className="w-[10%] h-full bg-boxes flex justify-center items-center cursor-pointer" onClick={handleInput} >
                        
                        <BiSend className=" text-primary h-7 w-7"/>
                    </div>

    
                </footer>: null}



            </section>

        )
    }

    return null
}

function Message({origin, message}: IMessageProp){

    if(origin === MessageOriginEnum.Incoming){
        return(
            <> 
                <div className="flex w-2/3 justify-start mb-6 text-boxes break-all">
                    <p className="p-2 bg-white rounded-md opacity-80 text-wrap laptop:text-sm">{message.text}</p>
                </div>   
            </>
        )
    }

    if(origin === MessageOriginEnum.Outgoing){
        return(
            <>
                <div className="w-full flex justify-end">
                    <div className="flex w-2/3 justify-end mb-6 text-boxes break-all">
                        <p className="p-2 bg-white inline-block rounded-md opacity-80 laptop:text-sm">{message.text}</p>
                    </div>
                </div>
            </>
        )
    }

    return null
}

function Notification({origin, message}: IMessageProp){
    return(
        <> 
            
            <p className="w-full text-center p-2 text-red-500 rounded-md opacity-80 text-wrap">{message.text}</p>
          
        </>
    )
}

