
import {useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";


export default function Incrementer({toNumber, symbol}: {toNumber: number, symbol: string}){

    const { number } = useSpring({
        from: { number: 0 },
        number: toNumber,
        delay: 200,
        config: { mass: 1, tension: 20, friction: 10 }
    });
    return (
        <div className="text-4xl center gap-2">
            <animated.div>{number.to((n)=> n.toFixed(0))}</animated.div>{symbol}
        </div>
    )

}