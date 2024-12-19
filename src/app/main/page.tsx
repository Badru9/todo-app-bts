'use client';

import {
  addChecklistItem,
  deleteChecklist,
  editChecklistStatus,
  getChecklist,
} from '@/services/checklist';
import Checklist from '../components/Checklist';
import { useCallback, useEffect, useState } from 'react';
import { ChecklistItemTypes, ChecklistTypes } from '@/services/types';
import { Button } from '@headlessui/react';
import { Trash, Plus, Check } from '@phosphor-icons/react';
import AddChecklistModal from '../components/AddChecklistModal';
import { toast } from 'react-toastify';
import { InputField } from '../components/InputField';

export default function Main() {
  const [checklistData, setChecklistData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showField, setShowField] = useState(false);
  const [showFieldID, setShowFieldID] = useState(0);

  const [todo, setTodo] = useState<string>('');

  const token: string = localStorage.getItem('token') || '';

  const fetchChecklist = useCallback(async () => {
    const response = await getChecklist(token);
    console.log(response);
    setChecklistData(response.data.data);
  }, [token]);

  const handleDelete = async (id: number) => {
    const response = await deleteChecklist(token, id);

    if (response.data.errorMessage === null) {
      toast.success('Checklist Berhasil Dihapus');
    } else {
      toast.error('Checklist Gagal Dihapus');
    }
    // console.log(response);
  };

  const handleCreate = async (id: number) => {
    const response = await addChecklistItem(token, id, todo);

    console.log(response);

    if (response.data.errorMessage === null) {
      window.location.reload();
    }
  };

  const handleEditStatusChecklistItem = async (id: number, itemID: number) => {
    const response = await editChecklistStatus(token, id, itemID);

    if (response.data.errorMessage === null) {
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, [fetchChecklist]);

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center gap-5'>
      <Button
        onClick={() => setOpenAddModal(true)}
        className='rounded bg-sky-600 py-2 flex items-center gap-1 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
      >
        <Plus weight='bold' /> Todo
      </Button>

      <div className='grid grid-cols-4 gap-4'>
        {checklistData.map((data: ChecklistTypes, checklistIdx: number) => (
          <Checklist key={checklistIdx} title={data.name}>
            <div className='flex gap-2'>
              {/* <Button
                onClick={() => handleCreate()}
                className='rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
              >
                <Plus />
              </Button> */}
              <Button
                onClick={() => handleDelete(data.id)}
                className='rounded bg-red-600 py-2 px-4 my-2 text-sm text-white data-[hover]:bg-red-500 data-[active]:bg-red-700'
              >
                <Trash />
              </Button>
            </div>
            {data.items?.map((task: ChecklistItemTypes, idx: number) => (
              <div key={idx} className='flex items-center py-2'>
                <input
                  type='checkbox'
                  className='mr-2'
                  onClick={() =>
                    handleEditStatusChecklistItem(data.id, task.id)
                  }
                />
                <p>{task.name}</p>
              </div>
            ))}
            <Button
              onClick={() => {
                setShowField(!showField);
                setShowFieldID(data.id);
              }}
              className='rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
            >
              <Plus />
            </Button>
            {showField && showFieldID === data.id && (
              <div className='flex items-center text-black py-2 gap-2'>
                <input
                  className='bg-smoke-white w-full rounded-full px-2 py-1'
                  placeholder='Masukkan TODO'
                  name='todo'
                  type='text'
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
                <Button
                  className='rounded-full bg-sky-600 p-2 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
                  onClick={() => handleCreate(data.id)}
                >
                  <Check weight='bold' />
                </Button>
              </div>
            )}
          </Checklist>
        ))}
      </div>

      {openAddModal && <AddChecklistModal setOpenAddModal={setOpenAddModal} />}
    </main>
  );
}
