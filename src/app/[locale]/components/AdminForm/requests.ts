export const updateRegistry = async (
  module: 'paint' | 'experience',
  pk: number,
  data: FormData
) => {
  const paint = await fetch(`/api/${module}/${pk}`, {
    method: 'PATCH',
    body: data
  }).then((res) => res.json());
  return paint;
};

export const deleteRegistry = async (
  module: 'paint' | 'experience',
  pk: number
) => {
  const paint = await fetch(`/api/${module}/${pk}`, {
    method: 'DELETE'
  }).then((res) => res.json());
  return paint;
};
