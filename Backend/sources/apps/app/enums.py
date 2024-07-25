class ChatStatus:
    Request = "Request"
    Open = "Open"
    Closed = "Closed"

class WSUserType:
    AnonymousUser = "AnonymousUser"
    Admin = "Admin"

class WSMessageType:
    chat = 0
    notification = 1

class WSType:
    Chat = 0
    Admin = 1
    
class WSMClientState:
    NameRequest = "name"
    CellphoneRequest = "cellphone"
    Done = "Done"

class  WSNotificationType:
    chatOpen = 0
    chatClosed = 1