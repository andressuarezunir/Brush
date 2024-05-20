export const addPaint = async (data: FormData) => {
  const paint = await fetch('/api/paints', {
    method: 'POST',
    body: data
  }).then((res) => res.json());
  return paint;
};
