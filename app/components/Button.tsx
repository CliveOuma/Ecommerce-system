"use client"

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    custom?: string,
    icon?: IconType,
    small?: boolean,
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
        <button onClick={onClick} disabled={disabled}
            className={`
                disabled:opacity-70
                rounded-md
                hover:opacity-90
                transition
                w-full
                border
                flex
                justify-center
                items-center
                gap-2
                ${outline ? 'bg-white' : 'bg-red-700'}
                ${outline ? 'text-gray-800' : 'text-white'}
                ${small ? 'text-sm font-light' : 'text-md font-semibold'}
                ${small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'}
                ${custom ? custom : ''}
            `}
        >
            {Icon && <Icon size={24} />}
            {label}
        </button>
    );
}

export default Button;
