"use client"
import clsx from 'clsx';

import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps{
    label: string;
    id: string;
    type ?: string;
    required ?: boolean;
    errors: FieldErrors,
    disabled ?: boolean;
}


const Input: React.FC<InputProps> = ({ label, id, type, required, errors, disabled }) => {
    return (
        <div>
            {/* if register is required */}
        </div>
    );
}
export default Input;