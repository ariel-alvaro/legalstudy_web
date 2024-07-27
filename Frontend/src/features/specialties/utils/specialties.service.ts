
import options from '../data/options.json'
import sections from '../data/sections_faq.json' 
import type { IOption, IQuestions } from '../interfaces/specialties.interface';



// interfaces/specialties.interface.ts


  
//export type sectionKey = keyof typeof options & keyof typeof sections

export default class FAQ {


    //Return the section options
    public static list_options(section: string): IOption[]{
        
        return (options as any)[section];
    }

    //Return the faq of the option selected
    public static list_faq(section: string, alias:string){
        //options: Object.keys((sections as any)[section][alias].options),
        const questions: IQuestions = {
            title: (sections as any)[section][alias].title,
            options: (sections as any)[section][alias].options
        }
        console.log(Object.keys(questions.options[0]) )
        return questions
    }

}