export const addPaint = async (data: FormData) => {
  const paint = await fetch('/api/paints', {
    method: 'POST',
    body: data
  }).then((res) => res.json());
  return paint;
};

export const addExperience = async (data: FormData) => {
  const paint = await fetch('/api/experiences', {
    method: 'POST',
    body: data
  }).then((res) => res.json());
  return paint;
};
