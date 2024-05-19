export const updatePainterGeneralData = async (data: FormData) => {
  const userObtained = await fetch('/api/painter', {
    method: 'PATCH',
    body: data
  }).then((res) => res.json());
  return userObtained;
};
