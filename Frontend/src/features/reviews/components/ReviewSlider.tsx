// React
import { useEffect, useRef, useState } from "react";

// Components
import ReviewBox from "./ReviewBox";

// React Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Interfaces
import type { IReview } from "../interfaces/reviews.interface";

// Utilities
import { Reviews } from "../utils/reviews";


export default function ReviewSlider(){
    const REVIEW_BOX_WIDTH = 328;
    const reviewsRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const [viewed, setViewed] = useState<number>(0);
    const [reviews, setReviews] = useState<IReview[]>(Reviews.list_reviews());
    
    

    useEffect(() => {
        // Solo activa el auto-scroll si autoScroll es true
        if (autoScroll) {
            const interval = setInterval(() => {
                
                if(viewed != reviews.length - 1 && autoScroll){
                    
                    setViewed( (prev) => prev + 1);
                    scroll(false, "right");
                }
                else{
                    scroll(true);
                    setViewed(0);
                    
                }
                
            }, 5*1000);

            // Limpia el intervalo cuando el componente se desmonte o cuando autoScroll cambie
            return () => clearInterval(interval);
        }
    }, [viewed, autoScroll]);


    const scroll = (reset: boolean , direction: string = "right", manual: boolean = false) => {

        if(manual){
            setAutoScroll(false);
        }

        if(reset == true){
            reviewsRef.current?.scrollBy({ left:-REVIEW_BOX_WIDTH * reviews.length, behavior: "smooth" });
            return
        }

        if (direction === "left") {
            reviewsRef.current?.scrollBy({ left:-REVIEW_BOX_WIDTH, behavior: "smooth" });
        } 
        else {
            reviewsRef.current?.scrollBy({ left: REVIEW_BOX_WIDTH, behavior: "smooth" });
        }
    };

    return (
        <section className="center-col gap-10 z-10">
            
            <section ref={reviewsRef} className="w-[20rem] laptop:w-[61rem] flex shrink-0 overflow-hidden gap-2 h-[13.1rem]">
                {
                    reviews.map((review, index)=>(
                        <ReviewBox key={index} review={review}/>
                    ))
                }
            
            </section>
            <div className="flex z-50 mb-10">
                <IoIosArrowBack className="w-10 h-20 text-boxes cursor-pointer" onClick={()=>{scroll(false, "left",true)}}/>
                <IoIosArrowForward className="w-10 h-20 text-boxes cursor-pointer" onClick={()=>{scroll(false, "right", true)}}/>
            </div>

        </section>
    )
}