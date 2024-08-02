import { useEffect, useState } from "react";

import {WebSocketHandler} from "@core/utils/websocket"
import Chat from "@components/chat/components/interactive/Chat";
import { ChatStatusEnum, UserTypeEnum } from "@components/chat/enums/chat.enum";
import type { IChat, IChatData } from "@components/chat/interfaces/chat.interface";
import type { IHttpOptions, IHTTPresponse } from "@core/interfaces/core.interface";
import { HttpRequest } from "@core/utils/http";
import { HTTPCodeEnum, HTTPMethodEnum } from "@core/enums/core.enum";
import WithAuth from "@components/admin/withAuth/components/WithAuth";

function ChatPanel(){

    const [chatSelected, setChatSelected] = useState<IChatData | undefined>()

    const setChat = (chat: IChat) => {
        setChatSelected(undefined);
        console.log("entre")
        let chat_data: IChatData = {
            roomID: chat.roomID,
            status: chat.status,
            client_data:{
                name: chat.client.name,
                cellphone: chat.client.cellphone
            }
        }

        setChatSelected(chat_data);
    }

    const closeChat = () => {
        setChatSelected(undefined)
    }
    return (
        <section className="screen laptop:grid laptop:grid-cols-2">



            <section className="laptop:full ">
                {chatSelected != undefined ? <Chat key={chatSelected.roomID} actual_user={UserTypeEnum.Admin} chat_data={chatSelected}/> : 
                <div className="full center">
                    <h2 className="text-primary u">seleccione un chat</h2>    
                </div>}
            </section>

            <Chats setChat={setChat}/>

        </section>
    )
}

function Chats({setChat}: {setChat: (chat:IChat) => void}){

    const [chatsOn, setChatsOn] = useState<IChat[]>([])
    const [chatsOff, setChatsOff] = useState<IChat[]>([])
    const [wsHandler, setWsHandler] = useState<WebSocketHandler>(new WebSocketHandler())

    useEffect(()=>{
        getChats()
        connectAdmin()
        //setLoading(false)
    
    },[])
    




    const connectAdmin = () => {
        const ws_url = "ws://localhost:8088/ws/admin/";
        wsHandler.connect(ws_url);
        wsHandler.setMessageHandler(messageHandler);
    }

    const  messageHandler = async () => {
        await getChats();
    }

    const  deleteChat = async (all: boolean = false, roomID:string = '') => {
        
        const url = all ? "http://localhost:8088/api/v1/chat_delete_all" : `http://localhost:8088/api/v1/chat_delete/${roomID}`

        const options: IHttpOptions = HttpRequest.generateOptions(url, {}) 

        const response: IHTTPresponse<any> = await HttpRequest.request<any>(HTTPMethodEnum.DELETE, options, true)

        if (response.status != HTTPCodeEnum.OK){
            await getChats()
        }

    }

    const getChats = async () => {
        
        const options: IHttpOptions = HttpRequest.generateOptions("http://localhost:8088/api/v1/chat_list", {})

        const response: IHTTPresponse<IChat[]> = await HttpRequest.request<IChat[]>(HTTPMethodEnum.GET,options, true) 

        if(response.status != 200){
            return
        }

        if(response.data){
            filterChats(response.data)
        }
        

    }
    
    const filterChats = (chats: IChat[]) => {
        
        let chats_on: IChat[] = chats.filter((chat) => chat.status === ChatStatusEnum.Open)
        let chats_off: IChat[] =  chats.filter((chat) => chat.status === ChatStatusEnum.Closed)

        console.log(chats_off, chats_on)
        setChatsOn(chats_on)
        setChatsOff(chats_off)

    }

    return (
        <section className="full bg-blue-400 grid grid-rows-2">



            <section className="full bg-boxes p-2">

                <div className="center-col-nomid gap-3 full border-2 p-5">

                    <h2 className="text-secondary font-bold uppercase text-2xl">Chats conectados</h2>

                    <div className="w-full h-full bg-boxes">

                        {
                            chatsOn.map((chat, index) => (
                                <div className="bg-secondary border border-muted rounded-lg p-4 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold">{chat.client.name}</h3>
                                        <p className="text-muted-foreground">+54 {chat.client.cellphone}</p>
                                    </div>
                                    <button className="bg-white rounded-md p-2" onClick={()=>{setChat(chat)}}>Connect</button>
                                </div>
                            ))
                        }

                    </div>
                    
                </div>


            </section>


            <section className="full laptop:full bg-boxes p-2">

                <div className="center-col-nomid gap-3 h-[90%] laptop:full border-2 p-5">

                    <h2 className="text-secondary font-bold uppercase text-2xl">Chats Guardados</h2>
                    <button className="bg-red-700 text-primary rounded-md p-2" onClick={()=>{deleteChat(true)}}>Borrar todos</button>


                    <div className="w-full h-full bg-boxes">
                    {
                        chatsOff.map((chat, index) => (
                            <div className="bg-secondary border border-muted rounded-lg p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">{chat.client.name}</h3>
                                    <p className="text-muted-foreground">+54 {chat.client.cellphone}</p>
                                </div>
                                <div className="center gap-2">
                                    <button className="bg-boxes text-primary rounded-md p-2" onClick={()=>{setChat(chat)}}>Abrir</button>
                                    <button className="bg-red-700 text-primary rounded-md p-2" onClick={()=>{deleteChat(false, chat.roomID)}}>Borrar</button>
                                </div>

                            </div>
                        ))
                    }
                    </div>
                    
                </div>


            </section>


        </section>
    )
    
}

export default WithAuth(ChatPanel);