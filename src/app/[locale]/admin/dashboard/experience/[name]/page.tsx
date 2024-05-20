interface Props {
  params: { name: string };
}

export default function ExperiencePage({ params }: Props) {
  console.log(params.name.split('_')[0]);

  return (
    <div>
      <h1>Experience Page</h1>
    </div>
  );
}
