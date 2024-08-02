import { type FormEvent, useContext, useEffect, useState } from "react";
import type { ICompensationResponse, IFormError } from "../interfaces/specialties.interface";
import Specialties from "../utils/specialties.service";
import type { IHttpOptions, IHTTPresponse } from "@core/interfaces/core.interface";
import { HttpRequest } from "@core/utils/http";
import { HTTPMethodEnum } from "@core/enums/core.enum";



export function Indemnization(){

    const [calculated, setCalculated] = useState(false)
    const [results, setResults] = useState<ICompensationResponse | null>(null)
    

    useEffect(()=> {
        console.log("asaaa",results)
        if ( results != null ){
            setCalculated(!calculated)
        }

    },[results])

    const handleResults = (results: ICompensationResponse) => {
        
        setResults(results)
    }
    
    return(
        <div className="full center">
            { !calculated ? <CompensationForm handleResults={handleResults}/> : <CompensationResults results={results}/>}
        </div>
    
    )
}
export function CompensationForm({handleResults}: {handleResults: (results: ICompensationResponse) => void}){


    //TODO: Cambiar esto a algo mas centralizado y accesible en vez de llamar siempre a setUrl
    const url = "http://localhost:8088/api/v1/calculo"
    const [formErrors, setFormErrors] = useState<IFormError>({dateError:'',salaryError:''})

    const requestCalculo = async (data: any) => {

        const requestData = Specialties.process_data(data)
        const options: IHttpOptions =  HttpRequest.generateOptions(url, requestData) 
        const response: IHTTPresponse<ICompensationResponse> = await HttpRequest.request<ICompensationResponse>(HTTPMethodEnum.POST, options)

        // if everything went correct
        if(response.status != 200){
            //toast warning logic
            return
        }
        if(response.data){
            handleResults(response.data)
        }
        

    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const [isValid, errors] = Specialties.check_form(data)

        setFormErrors(errors)
        
        if (isValid === true){
            requestCalculo(data)
        }

    }

    return(
        <>
            <div className="element w-[24rem] laptop:w-[30rem] bg-secondary rounded-lg p-7 ">


                <form className="center-col gap-6" onSubmit={handleSubmit}> 
                    
                    <div className="center-col ">
                        <span className="text-boxes bg-red-400 rounded-lg px-2 font-extralight">{formErrors.dateError}</span>
                        <div className="center gap-10">
                            <div className=" center-col  gap-1">
                                <h2 className="text-primary opacity-80 ">Fecha de ingreso</h2>
                                <input className=" bg-boxes text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="initial_date"/>
                            </div>

                            <div className="center-col items-center gap-1">
                                <h2 className="text-primary opacity-80 ">Fecha de salida</h2>
                                <input className=" bg-boxes text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="final_date"/>
                            </div>
                        </div>

                    </div>
                    
                    <div className=" center-col">
                        <span className="text-boxes bg-red-400 rounded-lg px-2 font-extralight">{formErrors.salaryError}</span>
                        <h2 className="text-primary opacity-80 ">sueldo</h2>
                        <input className=" bg-boxes lg:h-12 lg:text-2xl text-white text-center opacity-80 rounded-md text-lg border-2 border-zinc-900" min={0} type="number" placeholder="0" name="salary"/>
                    </div>

        
                    <div className="w-full center-col gap-4">
                        <h2 className="  text-primary opacity-80 text-center">Motivo del fin de la relación laboral</h2>

                        <div className="w-5/6 center">

                            <div className="relative center w-80">
                                <input className="sr-only peer " type="radio" value="Con causa" name="reason" id="concausa"/>

                                <label className="center text-[15px] p-2 bg-boxes border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-secondary peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent opacity-80" htmlFor="concausa">Con causa</label>

                            </div>
                            <div className="relative center w-80">
                                <input className="sr-only peer" type="radio" value="Sin causa" name="reason" id="sincausa" defaultChecked/>

                                <label className="center text-[15px] p-2 bg-boxes border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-secondary peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 " htmlFor="sincausa">Sin causa</label>

                            </div>

                            <div className="relative center w-80">
                                <input className="sr-only peer" type="radio" value="Renuncia" name="reason" id="renuncia"/>

                                <label className="center text-[15px] p-2 bg-boxes border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-secondary peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80" htmlFor="renuncia">Renuncia</label>
                                    
                            </div>
    

                        </div>



                    </div>

                    <div className="w-full center-col gap-4">
                        <h2 className="  text-primary opacity-80 lg:text-2xl">¿Hubo preaviso?</h2>

                        <div className="w-full center gap-7">

                            <div className="relative center w-20">
                                <input className="sr-only peer" type="radio" value="false" name="noticed" id="preavisono" defaultChecked/>

                                <label className="center text-[15px] p-2 bg-boxes border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-secondary peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-32" htmlFor="preavisono">No</label>

                            </div>
                            <div className="relative center w-20">
                                <input className="sr-only peer" type="radio" value="true" name="noticed" id="preavisosi"/>

                                <label className="center text-[15px] p-2 bg-boxes border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-secondary peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-32" htmlFor="preavisosi">Si</label>

                            </div>

    
    

                        </div>



                    </div>



                    <button type="submit" className="p-2 bg-boxes rounded-md text-white ">Calcular</button>
                </form>
    

    
                
            </div>
        </>
    
    )
}

function CompensationResults({results}: {results: ICompensationResponse | null}){

    return(
        <div className="element full animate-appear-opacity p-3">


            <ul className='center-col gap-2.5'>
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Antigüedad Art. 245</h3>
                    <h3 className="text-white opacity-80">${results?.antiquity}</h3>
                </li>     
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Sustitutiva de Preaviso</h3>
                    <h3 className="text-white opacity-80">${results?.noticedSust}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Antigüedad Art. 245</h3>
                    <h3 className="text-white opacity-80">${results?.noticedSac}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">SAC Preaviso</h3>
                    <h3 className="text-white opacity-80">${results?.dayMonth}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Integración mes de Despido</h3>
                    <h3 className="text-white opacity-80">${results?.monthIntegration}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">SAC Proporcional</h3>
                    <h3 className="text-white opacity-80">${results?.proportionalSac}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Vacaciones no gozadas</h3>
                    <h3 className="text-white opacity-80">${results?.holiday}</h3>
                </li>      
                <li className='w-full laptop:w-1/2 p-1 center-col text-left text-base rounded-lg shadow-sm shadow-white bg-secondary justify-between'>
                    <h3 className="w-full text-center lg:text-left text-white opacity-80">Total</h3>
                    <h3 className="text-white opacity-80">${results?.total}</h3>
                </li>         
        
            </ul>


        </div>
    )

}