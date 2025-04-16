import { Fragment } from "react";
import Card from "@/components/card";
import Link from "next/link";

export default function (props: {
  activity_name: string;
  results: Array<
    | boolean
    | {
        round_title: string;
        answers: boolean[];
      }
  >;
}) {
  return (
    <Card className="text-primary w-56">
      <h2 className="p-7 uppercase font-bold text-xs">{props.activity_name}</h2>
      <h1 className="pb-5 font-bold text-3xl capitalize">results</h1>

      <div className="flex flex-col w-full [&>div:last-child]:border-b">
        <List items={props.results} />
      </div>
      <div className="flex flex-col p-5">
        <Link href={"/exam"}>Home</Link>
      </div>
    </Card>
  );
}

function List(prop: {
  items: Array<
    | boolean
    | {
        round_title: string;
        answers: boolean[];
      }
  >;
}) {
  return (
    <Fragment>
      {prop.items.map((result, index) => {
        if (typeof result == "boolean")
          return (
            <div
              className=" border-t flex justify-between px-5 py-3"
              key={index}
            >
              <p className="w-fit">Q{index + 1}</p>
              <p className="w-fit font-bold text-right">
                {result ? "CORRECT" : "FALSE"}
              </p>
            </div>
          );
        return (
          <Fragment key={`${index}-results`}>
            <div className="text-center font-bold py-3  border-t w-full">
              {result.round_title}
            </div>
            <List items={result.answers} />
          </Fragment>
        );
      })}
    </Fragment>
  );
}
