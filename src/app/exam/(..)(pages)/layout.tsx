"use server"
import ErrorBox from "@/components/error-box";
import getExam from "@/app/exam/server-actions/get-exam";
import { PropsWithChildren } from "react";
import ExamCtxProvider from "@/app/exam/exam-ctx";

export default async function (props: PropsWithChildren) {
  const { data: response, error } = await getExam();
  if (error) return <ErrorBox>SERVER ERROR</ErrorBox>;
  return <ExamCtxProvider {...response.data}>{props.children}</ExamCtxProvider>;
}
