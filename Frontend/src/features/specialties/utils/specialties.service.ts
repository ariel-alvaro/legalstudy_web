// JSON

import { SPECIALTIES } from '../data/options';
import sections from '../data/sections_faq.json';

// Enums
import { FormErrorEnum } from '../enums/specialities.enum';

// Interfaces
import type { ICompensationRequest, IFormError, IOption, IQuestions } from '../interfaces/specialties.interface';



// interfaces/specialties.interface.ts


  
//export type sectionKey = keyof typeof options & keyof typeof sections

export default class Specialties {


    //Return the section options
    public static list_options(section: string): IOption[]{
        return (SPECIALTIES as any)[section];
    }

    //Return the faq of the option selected
    public static list_faq(section: string, alias:string){
        //options: Object.keys((sections as any)[section][alias].options),
        const questions: IQuestions = {
            title: (sections as any)[section][alias].title,
            options: (sections as any)[section][alias].options
        }
        return questions
    }

    public static check_form(data: any): [boolean, IFormError]{
        let isValid: boolean = true

        const errors: IFormError = {
            dateError: '',
            salaryError: '',
        }
        
        const initial_date = new Date(data.initial_date)
        const final_date =  new Date(data.final_date)
        

        if(data.initial_date === "" || data.final_date == ""){
            errors.dateError = FormErrorEnum.EmptyDate
            isValid = false
        }

        if (initial_date > final_date){
            errors.dateError = FormErrorEnum.InconsistentDates
            isValid = false
        }

        if (data.salary <= 0){
            errors.salaryError = FormErrorEnum.NegativeSalary
            isValid = false
        }
        
    

        return [isValid, errors]
    }

    public static process_data(data: any){

        const requestData: ICompensationRequest = {
            dates: {
                initial_date: data.initial_date,
                final_date: data.final_date
            },
            status: {
                salary: parseInt(data.salary),
                reason: data.reason,
                noticed: data.noticed === 'true',
                black: data.black === 'true'
            }
        }
        
        return requestData

    }
}

