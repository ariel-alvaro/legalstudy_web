export enum WebsocketTypeEnum{
    Chat = 0,
    Admin = 1
}

export enum UserTypeEnum{
    AnonymousUser = 'AnonymousUser',
    Admin = 'Admin'

}

export enum MessageTypeEnum{
    Chat = 0,
    Notification = 1
}

export enum MessageOriginEnum{
    Incoming = 'Incoming',
    Outgoing = 'Outgoing'

}

export enum ChatStatusEnum{
    Open = "Open",
    Closed = "Closed"
}