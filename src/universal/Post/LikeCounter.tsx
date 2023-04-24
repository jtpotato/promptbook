import { IPostElement } from "../Post";

function LikeCounter(props: IPostElement) {
  return (
    <>
      <div className="flex space-x-1 items-center cursor-pointer hover:bg-black/10 active:scale-95 w-fit px-2 rounded-md transition-all duration-100 select-none">
        <span className="material-symbols-outlined text-lg">favorite</span>
        <p>{props.post.likes}</p>
      </div>
    </>
  );
}

export default LikeCounter;