import { Separator } from "@radix-ui/react-separator";
import { HTMLAttributes, forwardRef } from "react";
import LikeCounter from "./Post/LikeCounter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export interface IPost {
  id: string;
  title: string;
  description: string;
  prompt: string;
  time: number;
  likes: number;
}

export interface IPostElement extends HTMLAttributes<HTMLDivElement> {
  post: IPost;
}

export const Post = forwardRef(function postElement(props: IPostElement) {
  dayjs.extend(relativeTime);

  return (
    <div
      {...props}
      className={`bg-neutral-100/50 p-4 rounded-lg text-neutral-800 max-w-3xl border-2 border-white bg-scroll ${props.className}`}
    >
      <h1 className="font-bold text-lg">{props.post.title}</h1>
      <p className="text-black/50">{props.post.description}</p>
      <Separator decorative className="my-4" />
      <p>{props.post.prompt}</p>
      <Separator decorative className="my-4 bg-white" style={{ height: "1px" }} />
      <div className="flex items-center justify-center space-x-2">
        <LikeCounter post={props.post} />
        <p className="text-black/50">{dayjs.unix(props.post.time).fromNow()}</p>
      </div>
    </div>
  );
});
