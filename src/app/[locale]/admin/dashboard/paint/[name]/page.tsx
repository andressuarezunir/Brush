interface Props {
  params: { name: string };
}

export default function PaintPage({ params }: Props) {
  console.log(params.name.split('_')[0]);

  return (
    <div>
      <h1>Paint Page</h1>
    </div>
  );
}
