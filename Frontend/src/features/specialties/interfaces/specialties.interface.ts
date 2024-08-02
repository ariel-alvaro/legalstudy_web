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

export interface ICompensationResponse{
    antiquity: number
    dayMonth: number 
    monthIntegration: number
    proportionalSac: number
    holiday: number
    noticedSust: number
    noticedSac: number
    total: number
}

export interface IFormError{
    dateError: string,
    salaryError: string
}

export interface ICompensationRequest{
    dates: IDates
    status: IStatus
}

interface IDates{
    initial_date: string
    final_date: string

}
interface IStatus{
    salary: number 
    reason: string
    noticed: boolean
    black: boolean
}