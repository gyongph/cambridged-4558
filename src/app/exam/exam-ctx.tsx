"use client";
import { PropsWithChildren, use, useState } from "react";
import { createContext } from "react";

export const ExamCtx = createContext<Exam>({
  name: "",
  heading: "",
  activities: [],
});

export default function ExamCtxProvider({
  children,
  ...exam_ctx
}: PropsWithChildren<Omit<Exam, "setUserAnswers" | "user_answers">>) {
  return (
    <ExamCtx.Provider
      value={{
        ...exam_ctx,
      }}
    >
      {children}
    </ExamCtx.Provider>
  );
}

export function useActivity(id: number | string) {
  const { activities } = use(ExamCtx);
  const activity = activities.find((item) => item.order == id);
  if (!activity) return;
  return activity;
}
