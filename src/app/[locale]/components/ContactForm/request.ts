import { FieldValues } from 'react-hook-form';

export const createContactRegistry = async (data: FieldValues) => {
  const paintsFiltered = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());
  return paintsFiltered;
};
