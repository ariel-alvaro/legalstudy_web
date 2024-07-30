export interface IOptionData{
    title: string,
    text: string
}

export interface IQuestions{
    title: string,
    options: { [key: string]: string }[];

}


export interface IOption{
    title: string,
    alias: string,
    imageName: string
    
}
