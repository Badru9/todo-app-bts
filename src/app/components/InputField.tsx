'use client';

interface InputFieldProps {
  placeholder: string;
  type: string;
  name: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = (props: InputFieldProps) => {
  return (
    <div className='flex items-center relative'>
      <input
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`bg-smoke-white w-full placeholder:text-sm text-base lg:text-base rounded-full h-12 px-4 ml-4 mb-4 focus:outline-none ring-0 text-slate-800 lg:placeholder:text-base ${props.className}`}
      />
    </div>
  );
};
