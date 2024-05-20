import { FieldValues } from 'react-hook-form';

export const filterPaints = async (data: FieldValues) => {
  data = { ...data, all: true };
  let url = '/api/paints';
  if (Object.keys(data).length > 0) url = `${url}?`;

  const paintsFiltered = await fetch(
    url + new URLSearchParams({ ...data }).toString(),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((res) => res.json());
  return paintsFiltered;
};

export const filterExperiences = async (data: FieldValues) => {
  data = { ...data, all: true };
  let url = '/api/experiences';
  if (Object.keys(data).length > 0) url = `${url}?`;

  const paintsFiltered = await fetch(
    url + new URLSearchParams({ ...data }).toString(),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((res) => res.json());
  return paintsFiltered;
};
