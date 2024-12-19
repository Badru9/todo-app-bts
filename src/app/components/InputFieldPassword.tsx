'use client';

import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';

interface InputFieldProps {
  placeholder: string;
  name: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFieldPassword = (props: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <div className='flex items-center relative'>
      <input
        placeholder={props.placeholder}
        type={showPassword ? 'password' : 'text'}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`bg-smoke-white w-full placeholder:text-sm text-base lg:text-base rounded-full h-12 px-3 ml-4 mb-4 focus:outline-none ring-0 text-slate-800 lg:placeholder:text-base ${props.className}`}
      />
      {showPassword ? (
        <Eye
          size={20}
          className='aspect-square absolute top-4 lg:top-5 right-5 cursor-pointer text-kotakery-red'
          onClick={() => {
            setShowPassword(!showPassword);
            console.log('check');
          }}
        />
      ) : (
        <EyeSlash
          size={20}
          className='aspect-square absolute top-4 lg:top-5 right-5 cursor-pointer text-kotakery-red'
          onClick={() => {
            setShowPassword(!showPassword);
            console.log('check');
          }}
        />
      )}
    </div>
  );
};
