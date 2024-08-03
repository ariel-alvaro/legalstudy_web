'use client'

import { type FormEvent, useContext, useEffect } from "react"


import type { IRequestUser } from "@components/admin/login/interfaces/login.interface"
import type { IHttpOptions, IHTTPresponse } from "@core/interfaces/core.interface"
import { HttpRequest } from "@core/utils/http"
import { HTTPMethodEnum } from "@core/enums/core.enum"
import { useNavigate } from "react-router-dom"
import Utils from "@core/utils/utils"

export default function Login() {

    

    const url = Utils.set_url(import.meta.env.PUBLIC_API_ENDPOINT,["auth","login"])


    const requestLogin = async (data: any) => {
        
        

        const RequestUser: IRequestUser = {
            username: data.username,
            password: data.password
        }

        const options: IHttpOptions = HttpRequest.generateOptions<IRequestUser>(url, RequestUser)
        const response: IHTTPresponse<any> = await HttpRequest.request<any>(HTTPMethodEnum.POST, options, true)

        if(response.status != 200){
            //toast warning logic
            return
        }
        
        
        window.location.replace("/administrator/home")
        
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        
        requestLogin(data)

    }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1a1b1e] px-4">
        <div className="w-full max-w-[400px] rounded-lg bg-[#2b2c31] p-8 shadow-lg">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Bienvenido</h2>
                <p className="text-muted-foreground">Iniciar sesion</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="mb-2 block text-sm font-medium text-white">
                    Username
                    </label>
                    <input
                    type="text"
                    name="username"
                    className="w-full rounded-md border-[#3c3d42] bg-[#3c3d42] px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    className="w-full rounded-md border-[#3c3d42] bg-[#3c3d42] px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <button type="submit" className="w-full">
                    Iniciar sesion
                </button>
            </form>
        </div>
    </div>
  )
}