import type { IMessage, IMessageData } from "@components/chat/interfaces/chat.interface";
import type { TSocketMessageHandler } from "@core/interfaces/core.interface"

export class WebSocketHandler{
    

    private websocket: WebSocket | null = null;
    private messageHandler: TSocketMessageHandler | null = null; 


    setMessageHandler(messageHandler: TSocketMessageHandler){
        this.messageHandler = messageHandler;
    }

    connect(url: string){
        console.log(url);
        this.websocket = new WebSocket(url)

        this.websocket.onopen = this.socketOnOpen
        this.websocket.onmessage = this.socketOnMessage
        this.websocket.onerror = this.socketOnError
        this.websocket.onclose = this.socketOnClose

    }
    
    closeSocket = (type: number) => {
        this.websocket?.close()
    }
    // Make send data method 
    socketSendData = (type: number, message: IMessageData) => {
        let data = JSON.stringify(message)

        this.websocket?.send(data)
        

    }
    
    socketOnOpen = (response: Event) => {
        // Make context state to the root and make the chat appear in case of success
        console.log(response)
    }

    socketOnMessage = (response: MessageEvent) => {
     
        let message: IMessage = JSON.parse(response.data) 
        
        console.log(message)
        if(this.messageHandler){
            this.messageHandler(message)
        }
        

        // this.messageHandler!(data.message)
    }

    socketOnClose = (response: CloseEvent) => {
        
    }

    socketOnError = (response: Event) => {
    
    }
}