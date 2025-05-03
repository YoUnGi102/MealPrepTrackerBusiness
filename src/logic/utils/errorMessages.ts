import { CustomError } from '../middleware/error.middleware';

export const STATUS = {
  // SUCCESS
  CREATED: 201,
  OK: 200,

  // CLIENT ERROR
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,

  // SERVER ERROR
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  // AUTH
  AUTH_USER_NOT_FOUND: { message: 'User not found', status: STATUS.NOT_FOUND },
  AUTH_INVALID_CREDENTIALS: { message: 'Invalid username or password', status: STATUS.CONFLICT },
  AUTH_TOKEN_INVALID: { message: 'Invalid or expired token', status: STATUS.UNAUTHORIZED },

  // USER
  USER_ALREADY_EXISTS: { message: 'User already exists', status: STATUS.CONFLICT },
  USER_NOT_FOUND: { message: 'User not found', status: STATUS.NOT_FOUND },
  USER_FORBIDDEN_ACTION: { message: 'You are not allowed to perform this action', status: STATUS.FORBIDDEN },

  // MEAL
  MEAL_NOT_FOUND: { message: 'Meal not found', status: STATUS.NOT_FOUND },
  MEAL_NAME_REQUIRED: { message: 'Meal name is required', status: STATUS.BAD_REQUEST },
  MEAL_INGREDIENT_INVALID: { message: 'One or more ingredients are invalid', status: STATUS.BAD_REQUEST },

  // INGREDIENT
  INGREDIENT_NOT_FOUND: { message: 'Ingredient not found', status: STATUS.NOT_FOUND },
  INGREDIENT_ALREADY_EXISTS: { message: 'Ingredient already exists', status: STATUS.CONFLICT },

  // GENERAL
  GENERAL_INTERNAL_ERROR: { message: 'Something went wrong. Please try again later.', status: STATUS.INTERNAL_SERVER_ERROR },
  GENERAL_INVALID_INPUT: { message: 'Invalid input provided', status: STATUS.BAD_REQUEST },
};

interface ErrorMessage {
  status: number;
  message: string;
}

const throwError = (errorData: ErrorMessage, internalMessage?: string) =>
  new CustomError(errorData.status, errorData.message, internalMessage);

export const ERRORS = {
  AUTH: {
    USER_NOT_FOUND: (internalMessage?: string) => throwError(MESSAGES.AUTH_USER_NOT_FOUND, internalMessage),
    INVALID_CREDENTIALS: (internalMessage?: string) => throwError(MESSAGES.AUTH_INVALID_CREDENTIALS, internalMessage),
    TOKEN_INVALID: (internalMessage?: string) => throwError(MESSAGES.AUTH_TOKEN_INVALID, internalMessage),
  },
  USER: {
    ALREADY_EXISTS: (internalMessage?: string) => throwError(MESSAGES.USER_ALREADY_EXISTS, internalMessage),
    NOT_FOUND: (internalMessage?: string) => throwError(MESSAGES.USER_NOT_FOUND, internalMessage),
    FORBIDDEN_ACTION: (internalMessage?: string) => throwError(MESSAGES.USER_FORBIDDEN_ACTION, internalMessage),
  },
  MEAL: {
    NOT_FOUND: (internalMessage?: string) => throwError(MESSAGES.MEAL_NOT_FOUND, internalMessage),
    NAME_REQUIRED: (internalMessage?: string) => throwError(MESSAGES.MEAL_NAME_REQUIRED, internalMessage),
    INGREDIENT_INVALID: (internalMessage?: string) => throwError(MESSAGES.MEAL_INGREDIENT_INVALID, internalMessage),
  },
  INGREDIENT: {
    NOT_FOUND: (internalMessage?: string) => throwError(MESSAGES.INGREDIENT_NOT_FOUND, internalMessage),
    ALREADY_EXISTS: (internalMessage?: string) => throwError(MESSAGES.INGREDIENT_ALREADY_EXISTS, internalMessage),
  },
  GENERAL: {
    INTERNAL: (internalMessage?: string) => throwError(MESSAGES.GENERAL_INTERNAL_ERROR, internalMessage),
    INVALID_INPUT: (internalMessage?: string) => throwError(MESSAGES.GENERAL_INVALID_INPUT, internalMessage),
  },
};
