import PHQActions from "./action.type";

export const fetchQuestions = () => ({
    type: PHQActions.FETCH_QUESTIONS,
});

export const fetchQuestionsSuccess = (questions) => ({
    type: PHQActions.FETCH_QUESTIONS_SUCCESS,
    payload: questions,
});

export const fetchQuestionsFailure = (error) => ({
    type: PHQActions.FETCH_QUESTION_FAILURE,
    payload: error,
});

export const postAnswer = (answers) => ({
    type: PHQActions.POST_ANSWER,
    payload: answers,
});

export const postAnswerSuccess = () => ({
    type: PHQActions.POST_ANSWER_SUCCESS,
});

export const postAnswerFailure = (error) => ({
    type: PHQActions.POST_ANSWER_FAILURE,
    payload: error,
});
