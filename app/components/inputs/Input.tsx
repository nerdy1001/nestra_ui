'use client'
import React from 'react'
import { MdCurrencyFranc } from 'react-icons/md'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    isHostingPage?: boolean;
    onChange?: (value: string) => void;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({ id, label, type, disabled, formatPrice, register, required, errors, isHostingPage }) => {
  return (
    <div className='w-full relative'>
        {formatPrice && (
            <MdCurrencyFranc size={24} className='text-neutral-700 absolute top-5 left-2' />
        )}
        {type === 'textarea' && (
          <>
            <textarea { ...register(id, {required})} id={id} cols={10} rows={10} className={`peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4' } ${errors[id] ? 'border-red-700' : 'border-neutral-300'} ${errors[id] ? 'focus:border-red-700' : 'focus:border-black' } `}></textarea>
            <label className={`absolute text-[12px] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  ${errors[id] ? 'text-red-700' : 'text-zinc-400'}`}>
              {label}
            </label>
          </>
        )}
        {type === 'dropdown' && (
          <>
            <select { ...register(id, {required})} id={id} className={`peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4' } ${errors[id] ? 'border-red-700' : 'border-neutral-300'} ${errors[id] ? 'focus:border-red-700' : 'focus:border-black' } `}>
              <option value="per year">Per year</option>
              <option value="per month">Per month</option>
              <option value="per week">Per week</option>
              <option value="per day">Per day</option>
            </select>
            <label className={`absolute text-[12px] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  ${errors[id] ? 'text-red-700' : 'text-zinc-400'}`}>
              {label}
            </label>
          </>
        )}
        {(type === 'text' || type === 'email' || type === 'number' || type === 'password') && (
          <>
            <input id={id} disabled={disabled} { ...register(id, {required})} placeholder=' ' type={type} className={`peer w-full p-4 pt-4 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4' } ${errors[id] ? 'border-red-700' : 'border-neutral-300'} ${isHostingPage ? 'border-none' : 'border-neutral-300'} ${isHostingPage ? 'bg-[#f5f5f5]' : 'bg-white'}  ${errors[id] ? 'focus:border-red-700' : 'focus:border-black' } `} />
            <label className={`absolute text-[12px] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  ${errors[id] ? 'text-red-700' : 'text-zinc-400'}`}>
              {label}
            </label>
          </>
        )}
    </div>
  )
}

export default Input