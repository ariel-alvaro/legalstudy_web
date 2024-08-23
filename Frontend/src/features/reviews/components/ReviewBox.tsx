// React Icons
import { IoIosStar } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

// Interfaces
import type { IReview } from "../interfaces/reviews.interface";


export default function ReviewBox({review}: {review: IReview}){

    const Stars = [0,0,0,0,0]

    return(
        <section className="shadow1 w-80 h-52 bg-white p-6 flex flex-col gap-2 shrink-0 text-black">
            <div className="flex gap-4 justify-between">

                <div className="w-full flex items-center gap-3 h-10">
                    <img className="rounded-full" src={review.imageUrl}></img>
                    <div>
                        <h3 className="font-semibold text-sm font-sans">{review.name}</h3>
                        <p className="font-thin text-xs">{review.date}</p>
                    </div>
                </div>



                <FcGoogle className="w-10 h-10"/>

            </div>
            <div className="flex">
                {Stars.map((value, index)=>(
                    <IoIosStar key={index} className="text-[#ffc848] w-5 h-5"/>
                ))}
                
            </div>
            <div className="text-sm overflow-scroll">
                <p>{review.text}</p>
            </div>
        </section>
    )
}