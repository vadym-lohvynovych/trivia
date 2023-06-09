import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Answer = "True" | "False";

export type Difficulty = "easy" | "hard";

export interface Question {
  category: string;
  question: string;
  correct_answer: Answer;
  user_answer: Answer;
}

interface TriviaState {
  loading: boolean;
  difficulty: Difficulty;
  questions: Question[];
  error: string | null;
  currentQuestionIndex: number;
  quizDone: boolean;
}

interface TriviaResponse {
  response_code: number;
  results: Question[];
}

const initialState: TriviaState = {
  questions: [],
  difficulty: "easy",
  loading: false,
  error: null,
  currentQuestionIndex: 0,
  quizDone: false,
};

export const fetchQuestions = createAsyncThunk(
  "fetchQuestions",
  async (difficulty: Difficulty) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`
    );
    return response.json();
  }
);

export const triviaSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    answerCurrentQuestion: (state, action: PayloadAction<Answer>) => {
      state.questions[state.currentQuestionIndex].user_answer = action.payload;
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
      } else {
        state.quizDone = true;
      }
    },
    changeDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    resetCurrentQuestion: (state) => {
      state.currentQuestionIndex = 0;
      state.quizDone = false;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchQuestions.fulfilled,
      (state, action: PayloadAction<TriviaResponse>) => {
        state.loading = false;
        state.questions = action.payload.results;
      }
    );
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = false;
      state.error = "ERROR";
    });
  },
});

export const {
  answerCurrentQuestion,
  changeDifficulty,
  resetCurrentQuestion,
  resetState,
} = triviaSlice.actions;
