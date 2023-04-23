export interface IPost {
  id: string;
  title: string;
  description: string;
  prompt: string;
  time: number;
  likes: number;
}

function Card(props: React.PropsWithChildren) {
  return (
    <>
      <div className="bg-neutral-100 rounded-lg p-4">{props.children}</div>
    </>
  );
}

function Description(props: React.PropsWithChildren) {
  return (
    <>
      <p className="mb-4">{props.children}</p>
    </>
  );
}

function Prompt(props: React.PropsWithChildren) {
  return (
    <>
      <p className="bg-gradient-to-t from-transparent via-black/20 to-black bg-clip-text text-transparent">{props.children}</p>
    </>
  );
}

function Title(props: React.PropsWithChildren) {
  return (
    <>
      <p className="font-bold">{props.children}</p>
    </>
  );
}

export const Post = { Card, Prompt, Title, Description }