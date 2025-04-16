"use client";
import Card from "@/components/card";
import Link from "next/link";
import { FC, use } from "react";
import { ExamCtx } from "@/app/exam/exam-ctx";
const HomePage: FC = () => {
  const { activities, name } = use(ExamCtx);
  return (
    <Card className="text-primary w-40">
      <h3 className="p-5">CAE</h3>
      <h1 className="font-bold text-xl pb-5">{name}</h1>
      <div className="table border-collapse w-full">
        {activities.map((activity, index) => (
          <ActivityComponent key={`activity-${index}`} {...activity} />
        ))}
      </div>
      <div className="p-5"></div>
    </Card>
  );
};

function ActivityComponent(props: Activity) {
  const first_item = props.questions[0];
  return (
    <div className="table-row text-center">
      {first_item ? (
        <Link
          href={`/exam/activity/${props.order}`}
          className="p-2 border-y table-cell"
        >
          {props.activity_name}
        </Link>
      ) : (
        <div className="text-red-300 p-2 border-y table-cell">NO QUESTIONS</div>
      )}
    </div>
  );
}

export default HomePage;
