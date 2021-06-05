import {
  ADD_DRINK,
  DRINK_ERROR,
  GET_ALL_DRINKS,
  GET_ALL_DRINKS_REQUEST,
  GET_DRINK_BY_CATEGORY,
  GET_DRINK_BY_CATEGORY_REQUEST,
  GET_DRINK_BY_ID,
} from "../constants/cocktailConstants";

const initialState = {
  cocktails: [],
  cocktail: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DRINKS_REQUEST:
    case GET_DRINK_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_DRINKS:
      return {
        ...state,
        cocktails: action.payload,
        loading: false,
      };
    case ADD_DRINK:
      return {
        ...state,
        cocktails: [...state.cocktails, action.payload],
        loading: false,
      };
    case GET_DRINK_BY_CATEGORY:
      return {
        // ...state,
        cocktails: action.payload.drinks.filter(
          (cocktail) => cocktail.category === action.payload.category
        ),
        loading: false,
      };
    case GET_DRINK_BY_ID:
      return {
        ...state,
        cocktail: action.payload,
        loading: false,
      };
    case DRINK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
