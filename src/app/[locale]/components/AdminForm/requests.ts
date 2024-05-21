export const updatePaint = async (pk: number, data: FormData) => {
  const paint = await fetch(`/api/paint/${pk}`, {
    method: 'PATCH',
    body: data
  }).then((res) => res.json());
  return paint;
};

export const updateExperience = async (pk: number, data: FormData) => {
  const paint = await fetch(`/api/experience/${pk}`, {
    method: 'PATCH',
    body: data
  }).then((res) => res.json());
  return paint;
};
