import PHQActions from "./action.type";

const initState = {
    isLoading: false,
    errorMessage: "",
    questions: [],
};

const PHQReducer = (state = initState, action) => {
    switch (action.type) {
        case PHQActions.FETCH_QUESTIONS:
            return {
                isLoading: true,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.FETCH_QUESTIONS_SUCCESS:
            return {
                isLoading: false,
                errorMessage: "",
                questions: action.payload,
            };
        case PHQActions.FETCH_QUESTION_FAILURE:
            return {
                isLoading: false,
                errorMessage: action.payload,
                questions: [],
            };

        case PHQActions.POST_ANSWER:
            return {
                isLoading: true,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.POST_ANSWER_SUCCESS:
            return {
                isLoading: false,
                errorMessage: "",
                questions: [],
            };
        case PHQActions.POST_ANSWER_FAILURE:
            return {
                isLoading: false,
                errorMessage: action.payload,
                questions: [],
            };
        default:
            return state;
    }
};

export default PHQReducer;
