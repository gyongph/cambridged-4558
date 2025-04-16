import useCounter from "@/hooks/use-counter";
import { useEffect, useState } from "react";
import Card from "@/components/card";

export default function RunExam(props: {
  activity_title: string;
  questions: Array<Question | Round>;
  onComplete: (results: Array<any>) => void;
  round_title?: string;
}) {
  const [prompted, setPrompted] = useState(false);
  const [results, setResults] = useState<Array<any>>([]);
  const counter = useCounter(0);
  const question = props.questions[counter.value];
  useEffect(() => {
    if (!question) {
      counter.reset();
      setResults([]);
      props.onComplete([...results]);
    }
  }, [counter]);
  if (!question) return null;

  if ("questions" in question) {
    if (!prompted)
      return (
        <Card className="text-primary w-80 h-full max-h-[220px] p-5 justify-evenly items-start">
          <h2 className="font-bold text-sm">{props.activity_title}</h2>
          <h1 className="font-bold text-xl ">{question.round_title}</h1>
          <button
            onClick={() => setPrompted(true)}
            className="bg-primary p-2 text-sm text-white rounded self-end place-self-end text-end hover:scale-105 duration-100 cursor-pointer"
          >
            Proceed
          </button>
        </Card>
      );
    return (
      <RunExam
        activity_title={props.activity_title}
        questions={question.questions}
        round_title={question.round_title}
        onComplete={(result) => {
          setResults((old) => [
            ...old,
            { round_title: question.round_title, answers: result },
          ]);
          counter.increase();
          setPrompted(false);
        }}
      />
    );
  }

  const answerQuestion = (answer: boolean) => {
    counter.increase();
    setResults((old) => [...old, answer == question.is_correct]);
  };

  return (
    <Card className="w-72 text-primary items-start">
      <h2 className=" p-5 text-base font-semibold">
        {props.activity_title}{" "}
        {props.round_title ? `/ ${props.round_title}` : ""}
      </h2>
      <h1 className="pl-5 pb-5  text-3xl font-bold">Q{question.order}.</h1>
      <Formatted content={question.stimulus} />
      <div className="grid grid-cols-2 w-full">
        <button
          onClick={() => answerQuestion(true)}
          className="p-5 text-base font-bold uppercase"
        >
          Correct
        </button>
        <button
          onClick={() => answerQuestion(false)}
          className="p-5 text-base font-bold uppercase"
        >
          Incorrect
        </button>
      </div>
    </Card>
  );
}

function Formatted({ content }: { content: string }) {
  const [head, contested, tail] = content.split("*");
  return (
    <p className="border-y border-primary p-3 text-base w-full ">
      {head}
      <span className="font-bold">{contested}</span>
      {tail}
    </p>
  );
}
