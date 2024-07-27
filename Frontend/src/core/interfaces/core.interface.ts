//Web Socket interfaces/types
export type TSocketMessageHandler = (obj: any) => void

export interface IWebSocket{
    type: number
    websocket: WebSocket
    handler: TSocketMessageHandler
}

//HTTP interfaces

export interface IHttpOptions{
    url: string
    params?: any
}


export interface IHTTPresponse<T>{
    status: number,
    data: T | undefined
}


export interface IHTTPdetail{
    detail: string
}