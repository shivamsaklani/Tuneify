"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
type buttonProps={
    children:ReactNode,
    onclick:()=>void,
    variant?:"default"|"primary" |"secondary" |"other",
    size?:"sm" |"lg" |"md"
}
export const Button =({children,onclick,variant="default",size="md"}:buttonProps)=>{
    const baseclass="flex font-sans font-semibold cursor-pointer max-w-md shadow-md  justify-center items-center rounded-lg";
    const variantClass ={
        default:"text-black hover:bg-gray-300",
        primary:"bg-primary text-white hover:bg-secondary",
        secondary:"bg-accent text-white hover:bg-accent/90",
        other:"bg-black text-white hover:bg-secondary"
    };
    const Size={
        sm:"px-3 py-2 text-md",
        md:"px-6 py-3 text-md",
        lg:"sm:px-8 sm:py-4 sm:text-lg px-6 py-4 text-sm"
    }
    return(
        <div className={twMerge(baseclass,variantClass[variant],Size[size])}>
            <button onClick={onclick}>
                {children}
            </button>
        </div>
    )
}