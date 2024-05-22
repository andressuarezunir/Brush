import { FieldValues } from 'react-hook-form';

export const filter = async (module: string, data: FieldValues) => {
  let url = `/api/${module}s`;
  if (Object.keys(data).length > 0) url = `${url}?`;

  const paintsFiltered = await fetch(
    url + new URLSearchParams(data).toString(),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((res) => res.json());
  return paintsFiltered;
};
