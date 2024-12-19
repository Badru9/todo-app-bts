'use client';

import Link from 'next/link';
import { InputField } from '@/app/components/InputField';
import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth';
import { toast } from 'react-toastify';
import { InputFieldPassword } from '@/app/components/InputFieldPassword';
import Image from 'next/image';
import logo from '@/../public/logo.webp';
import Loading from '@/app/components/Loading';

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      toast.error('Email or Password cannot be empty');
    } else {
      setIsLoading(true);
      const data = {
        email,
        username,
        password,
      };

      const response = await register(data);

      console.log('response', response);

      if (response?.data.errorMessage === null) {
        toast.success('Register Berhasil');

        router.push('/');
      } else {
        toast.error('Email atau Password Salah');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/main');
    }
  }, [router]);

  return (
    <div className='flex items-center p-5 lg:p-0 justify-center min-h-screen'>
      <Image
        src={logo}
        alt='background'
        className='w-1/2 fixed -z-10 bg-repeat-x object-cover opacity-15'
      />
      <div className='bg-smoke-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-smoke-white/30 w-full lg:w-1/4 h-fit rounded-xl'>
        {/* <div className='flex'> */}
        <div className='flex w-full justify-center text-smoke-white flex-col text-center'>
          <h1 className='text-2xl mt-10 font-semibold tracking-wide items-start'>
            REGISTER
          </h1>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col mt-10 px-5 w-full'>
              <InputField
                placeholder='Username'
                type='username'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <InputField
                placeholder='Email'
                type='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <InputFieldPassword
                placeholder='Password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className='flex justify-start lg:justify-end pl-10 lg:px-6'>
              <Link
                href='/'
                className='w-fit text-smoke-white text-sm lg:text-base hover:underline'
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type='submit'
              className={`bg-primary rounded-full text-center text-sm lg:text-base p-2 ml-4 min-w-52 my-5 ${
                isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : 'Login'}
            </button>
            <div className='flex justify-center'>
              <Link
                href='/'
                className='w-fit text-smoke-white text-sm lg:text-base group mb-32'
              >
                Already have an account?{' '}
                <span className='font-semibold group-hover:underline'>
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>

        {/* <div className='bg-smoke-white m-4 w-1/2 bg-opacity-60 rounded-md lg:block hidden'></div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
