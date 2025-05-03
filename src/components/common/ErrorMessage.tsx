import React from "react";

interface ErrorMessageProps {
  errorMessage?: string;
  className?: string;
}

const ErrorMessage = ({ errorMessage, className }: ErrorMessageProps) => {
  if (!errorMessage) return null;
  return <p className={className}>{errorMessage}</p>;
};

export default ErrorMessage;
