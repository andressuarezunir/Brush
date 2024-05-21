export const addRegistry = async (
  module: 'paint' | 'experience',
  data: FormData
) => {
  const paint = await fetch(`/api/${module}s`, {
    method: 'POST',
    body: data
  }).then((res) => res.json());
  return paint;
};
