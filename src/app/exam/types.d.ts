type Question = {
  order: number;
  is_correct: boolean;
  stimulus: string;
  user_answers: Array<any>;
  feedback: string;
};

type Round = {
  round_title: string;
  order: number;
  questions: Array<Question>;
};

type Activity = {
  activity_name: string;
  order: number;
  questions: Array<Question | Round>;
};

type Answer = {
  activity_id: number;
  round_id?: number;
  question_id: number;
  answer: boolean;
};

type Exam = {
  name: string;
  heading: string;
  activities: Array<Activity>;
};

type Results = Array<
  | boolean
  | {
      round_title: string;
      answers: boolean[];
    }
>;
