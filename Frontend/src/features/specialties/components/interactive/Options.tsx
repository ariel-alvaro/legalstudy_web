import { useEffect, useState } from "react"
import { SectionEnum } from "@components/specialties/enums/specialities.enum"
import "@components/specialties/styles/specialties.css"
import {type IOption, type IQuestions } from "@components/specialties/interfaces/specialties.interface"
import FAQ from "@components/specialties/utils/specialties.service";


export default function Options(){
    
    const [section, setSection] = useState<string>(SectionEnum.Laboral)
    const [options, setOptions] = useState<IOption[]>(FAQ.list_options(SectionEnum.Laboral));
    const [questions, setQuestions] = useState<IQuestions | null>(null)
    const [selectedQuestion, setSelectedQuestion] = useState("");


    useEffect(()=>{
        console.log(questions)
    },[questions])


    
    const handleSection = (section: string) => {
        let options: IOption[] = FAQ.list_options(section);
        setSection(section);
        setOptions(options);
        setQuestions(null);
        setSelectedQuestion("");
    }   

    const handleSelection = (alias: string) => {
        setQuestions(FAQ.list_faq(section, alias));
        console.log(questions)
    }

    const handleQuestion = (question: string) => {

        if(question == selectedQuestion){
            setSelectedQuestion("");
        }

        setSelectedQuestion(question);
    }


    return(

        <section className="full center-col-nomid gap-8 monitor:gap-2 bigmonitor:gap-8">

            <div>

                <button className=" text-boxes h-full border-zinc-600 grow border-r-2 border-l-2 rounded-l-lg hover:bg-secondary focus:bg-secondary p-3" onClick={()=>{handleSection(SectionEnum.Laboral)}}>LABORAL</button>
                <button className=" text-boxes h-full border-zinc-600 grow border-r-2 hover:bg-secondary focus:bg-secondary p-3" onClick={()=>{handleSection(SectionEnum.Civil)}}>CIVIL</button>
                <button className=" text-boxes h-full border-zinc-600 grow border-r-2 rounded-r-lg hover:bg-secondary focus:bg-secondary p-3" onClick={()=>{handleSection(SectionEnum.Familiar)}}>FAMILIAR</button>

            </div>
            

            {questions == null ?
            <section className="element full center flex-wrap gap-5 mb-10 laptop:mb-0 laptop:w-[60rem] laptop:h-[28rem] bigmonitor:h-[45rem] monitor:w-[65rem] ">

                {
                    options.map((option, index)=>(
                        <div key={index} className="center w-60 h-60 monitor:w-64 monitor:h-52 bigmonitor:w-80 bigmonitor:h-80 rounded-lg bg-black relative cursor-pointer" onClick={()=>{handleSelection(option.alias)}}>
                            <h2 className="uppercase font-bold text-3xl text-center z-10">{option.title}</h2>
                            <img src={`/static/${option.imageName}`} className="w-full h-full absolute opacity-65 rounded-lg"></img>
                            
                        </div>
                    ))
                }
                
            </section>

            :
 
            <section className="p-7 overflow-scroll gap-2  w-[60rem] monitor:h-[30rem] bigmonitor:h-[37rem] ">
                
                {
                    (questions.options).map((question, index)=>(
                        // <div key={index} className="w-full">
                        //     <button className="w-full h-32 bg-slate-700" onClick={()=>{setSelectedQuestion(Object.keys(question)[0])}}>{Object.keys(question)[0]}</button>
                        //     {selectedQuestion ==  Object.keys(question)[0] ? <p className="appear bg-red-700 w-full text-center">{Object.values(question)}</p> : null}
                        // </div>

                        <div key={index} className="element bg-boxes cursor-pointer  mx-auto p-5 bigmonitor:p-8 rounded-lg border laptop:w-[55rem] mb-4">
                            
                            <div className="suave hover:scale-105 space-y-4 ">
                                <h2 className="text-2xl font-bold text-center" onClick={()=>{setSelectedQuestion(Object.keys(question)[0])}}>{Object.keys(question)[0]}</h2>
                                {selectedQuestion ==  Object.keys(question)[0] ?
                                <p className="appear text-text1 center text-muted-foreground">
                                    <ConvertJumpText text={Object.values(question)[0]}/>
                                </p>
                                :null}
                            </div>
                        </div>
                    ))
                }
                
            </section>

            }


        </section>

                    

    )
}
function ConvertJumpText({text}: {text: string}) {
    console.log(text.split(/\r?\n|\r|\n/g))
    return (
      <div>
        {text.split('\n').map((linea, index) => (
          <div key={index} className="text-center">
            {linea}
            <br />
          </div>
        ))}
      </div>
    );
  };