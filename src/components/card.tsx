import { HTMLProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export default function ({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLDivElement>>) {
  return (
    <div
      className={twMerge(
        "bg-foreground max-h-screen overflow-y-auto flex flex-col items-center  border border-blue-400",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
