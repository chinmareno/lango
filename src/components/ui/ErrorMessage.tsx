import React from "react";

interface ErrorMessageProps {
  errorMessage?: string;
  className?: string;
}

const ErrorMessage = ({ errorMessage, className }: ErrorMessageProps) => {
  return errorMessage ? (
    <p role="alert" className={`${className} text-sm text-red-500`}>
      {errorMessage}
    </p>
  ) : null;
};

export default ErrorMessage;
