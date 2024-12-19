import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function getChecklist(token: string) {
  const response = await axios.get(`${ROOT_API}/checklist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function addChecklist(token: string, name: string) {
  const response = await axios.post(
    `${ROOT_API}/checklist`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export async function deleteChecklist(token: string, id: number) {
  const response = await axios.delete(`${ROOT_API}/checklist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function addChecklistItem(
  token: string,
  id: number,
  itemName: string
) {
  const response = await axios.post(
    `${ROOT_API}/checklist/${id}/item`,
    { itemName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export async function editChecklistStatus(
  token: string,
  id: number,
  itemId: number
) {
  console.log(token);

  const response = await axios.put(
    `${ROOT_API}/checklist/${id}/item/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}
