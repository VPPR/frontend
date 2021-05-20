import PHQActions from "./action.type";

const initState = {
    isLoading: false,
    errorMessage: "",
    questions: [],
    score: null,
    dailyscores: [],
};

const PHQReducer = (state = initState, action) => {
    switch (action.type) {
        case PHQActions.FETCH_QUESTIONS:
            return {
                ...state,
                isLoading: true,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                questions: action.payload,
            };
        case PHQActions.FETCH_QUESTION_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                questions: [],
            };

        case PHQActions.POST_ANSWER:
            return {
                ...state,
                isLoading: true,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.POST_ANSWER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.POST_ANSWER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                questions: [],
            };

        case PHQActions.FETCH_SCORE:
            return {
                ...state,
                isLoading: true,
                errorMessage: "",
            };

        case PHQActions.FETCH_SCORE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                score: action.payload,
            };

        case PHQActions.FETCH_SCORE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        case PHQActions.FETCH_DAILY_SCORES:
            return {
                ...state,
                isLoading: true,
                errorMessage: "",
            };
        case PHQActions.FETCH_DAILY_SCORES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                dailyscores: action.payload,
            };
        case PHQActions.FETCH_DAILY_SCORES_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default PHQReducer;
