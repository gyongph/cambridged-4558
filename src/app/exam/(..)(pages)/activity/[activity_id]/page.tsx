"use client";

import ErrorBox from "@/components/error-box";
import { useActivity } from "@/app/exam/exam-ctx";
import { useParams } from "next/navigation";
import { useState } from "react";
import RunExam from "@/app/exam/components/RunExam";
import ShowResults from "@/app/exam/components/ShowResults";

export default function QuestionPage() {
  const params = useParams<{ activity_id: string }>();
  const [results, setResults] = useState<Results | null>();
  const activity = useActivity(params.activity_id);
  if (!activity) return <ErrorBox>Invalid activity id</ErrorBox>;
  if (results)
    return (
      <ShowResults activity_name={activity.activity_name} results={results} />
    );

  return (
    <RunExam
      activity_title={activity.activity_name}
      questions={activity.questions}
      onComplete={(results) => setResults(results)}
    />
  );
}
