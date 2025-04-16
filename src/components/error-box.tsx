import { PropsWithChildren } from "react";

export default function ErrorBox(props: PropsWithChildren) {
  return (
    <div className="text-red-400 p-5 border border-red-400">
      {props.children}
    </div>
  );
}
