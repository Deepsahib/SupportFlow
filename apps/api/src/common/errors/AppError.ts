export const AppError = (message: string, statusCode: number) => {
  const error = new Error(message) as Error & { statusCode: number };

  error.statusCode = statusCode;

  return error;
};