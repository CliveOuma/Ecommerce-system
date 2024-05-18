"use client"

import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?:boolean,
    custom?:string,
    icon?: IconType,
    small?:boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void

}
const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    custom,
    icon: Icon,
    small,
    onClick,

}) => {
    return ( 
        <button onClick={onClick} disabled = {disabled}
        className={`
        disabled: opacity-70
        disabled: cursor-pointer
        rounded-md
        hover:opacity-90
        transition
        w-full
        border-slate-700
        flex
        justify-center
        items-center
        gap-2
        ${outline? 'bg-white' : 'bg-slate-700'}
        ${outline? 'text-slate-700' : 'text-white'}
        ${small? 'text-sm font-light' : 'text-md font-semibold'}
        ${small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'}        ${custom ? custom: ''}
        
        `}
        >
            {Icon &&  <Icon size={24}/>}
            {label}
        </button>
    );
}
 
export default Button;