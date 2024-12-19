interface checklistProps {
  title: string;
  children: React.ReactNode;
}

export default function Checklist({ children, title }: checklistProps) {
  return (
    <div className='h-fit min-w-[200px] bg-primary p-5 flex flex-col'>
      <div>
        <h1>{title}</h1>
      </div>

      <div>{children}</div>
    </div>
  );
}
