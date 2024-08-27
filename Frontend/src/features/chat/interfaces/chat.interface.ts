export interface IChatData{
    roomID: string
    status: string
    client_data: IClientData
}

export interface IClientData{
    name: string
    cellphone: string
}

export interface IMessageProp{
    origin: string
    message: IMessageData
}

export interface IMessage{
    type: number
    data: IMessageData
}

export interface IMessageData{
    user_type?: string
    message_type?: number
    text: string
}

export interface IChat{
    created: string
    roomID: string
    status: string
    client: IClientData
    messages: IMessageData[]

}