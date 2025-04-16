"use client";
import { PropsWithChildren, use, useState } from "react";
import { createContext } from "react";

export const ExamCtx = createContext<Exam>({
  name: "",
  heading: "",
  activities: [],
  user_answers: [],
  setUserAnswers() {},
});

export default function ExamCtxProvider({
  children,
  ...exam_ctx
}: PropsWithChildren<Omit<Exam, "setUserAnswers" | "user_answers">>) {
  const [user_answers, setUserAnswers] = useState<Array<Answer>>([]);
  return (
    <ExamCtx.Provider
      value={{
        ...exam_ctx,
        user_answers,
        setUserAnswers,
      }}
    >
      {children}
    </ExamCtx.Provider>
  );
}

export function useActivity(id: number | string) {
  const { activities, setUserAnswers, user_answers } = use(ExamCtx);
  const activity = activities.find((item) => item.order == id);
  if (!activity) return;
  const activity_id = activity.order;
  return {
    ...activity,
    answer(target: {
      round_id?: number;
      question_id: number;
      answer: boolean;
    }) {
      setUserAnswers((old_answers) => {
        const existing = old_answers.find((old) => {
          return (
            old.activity_id == activity_id &&
            old.question_id == target.question_id &&
            (!target.round_id || target.round_id == old.round_id)
          );
        });
        const new_answers = [...old_answers];
        if (existing) {
          existing.answer = target.answer;
        } else {
          new_answers.push({ activity_id, ...target });
        }
        return new_answers;
      });
    },
  };
}
