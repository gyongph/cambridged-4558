"use server";
import { tryCatch } from "@/utils/try-catch";
import axios from "axios";
 

type Payload = {
  name: string;
  heading: string;
  activities: Array<Activity>;
};

export default async function () {
  return tryCatch(axios.get<Payload>(process.env.EXAM_API_ENDPOINT || ""));
}
