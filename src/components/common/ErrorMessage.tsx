import React from "react";

interface ErrorMessageProps {
  errorMessage?: string;
  className?: string;
}

const ErrorMessage = ({ errorMessage, className }: ErrorMessageProps) => {
  if (!errorMessage) return null;
  return <p className={`${className} text-sm text-red-500`}>{errorMessage}</p>;
};

export default ErrorMessage;
