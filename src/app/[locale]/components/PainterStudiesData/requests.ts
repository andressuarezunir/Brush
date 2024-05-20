interface Props {
  pk: number;
  data: object;
}

export const updateStudy = async ({ pk, data }: Props) => {
  const study = await fetch(`/api/study/${pk}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());
  return study;
};

export const deleteStudy = async (pk: number) => {
  const study = await fetch(`/api/study/${pk}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: false }),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());
  return study;
};

export const addStudy = async (data: object) => {
  const study = await fetch('/api/studies', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());
  return study;
};
