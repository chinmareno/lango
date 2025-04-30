import React from 'react';

const InputError = (message: string | undefined) => {
  if (!message) return null;
  return <p className="-mt-2 text-sm text-red-500">{message}</p>;
};

export default InputError;
