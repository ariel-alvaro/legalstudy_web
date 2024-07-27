export interface IOptionData{
    title: string,
    text: string
}

export interface IQuestions{
    title: string,
    options: string[]
    options_info: { [key: string]: string };
    
}


export interface IOption{
    title: string,
    alias: string,
    imageName: string
    
}
