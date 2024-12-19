'use client';

import { Button, Field, Label } from '@headlessui/react';
import { InputField } from './InputField';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { addChecklist } from '@/services/checklist';

interface AddChecklistModalProps {
  setOpenAddModal: (value: boolean) => void;
}

export default function AddChecklistModal({
  setOpenAddModal,
}: AddChecklistModalProps) {
  const [name, setName] = useState('');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (name === '') {
      toast.error('Name cannot be empty');
    }

    await addChecklist(localStorage.getItem('token') as string, name);

    setOpenAddModal(false);

    window.location.reload();
  };

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-50'>
      <form className='flex flex-col bg-white rounded-lg p-5'>
        <Field className='flex flex-col gap-2 text-black'>
          <Label className='text-base'>Name</Label>
          <InputField
            name='name'
            placeholder='Name'
            type='text'
            className='border border-black/70'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <div className='flex items-center gap-2 justify-end'>
          <Button
            onClick={() => setOpenAddModal(false)}
            className='rounded bg-red-600 py-2 px-4 text-sm text-white data-[hover]:bg-red-500 data-[active]:bg-red-700'
          >
            Kembali
          </Button>
          <Button
            onClick={handleSubmit}
            className='rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
          >
            Tambah
          </Button>
        </div>
      </form>
    </main>
  );
}
