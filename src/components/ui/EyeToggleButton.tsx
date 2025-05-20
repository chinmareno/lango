import { Eye, EyeClosed } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

interface EyeToggleButtonProps {
  eyeIsOpen: boolean;
  setEyeIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  eyeSize?: number;
  ariaLabel: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const EyeToggleButton = ({
  eyeIsOpen,
  setEyeIsOpen,
  className,
  eyeSize = 20,
  ariaLabel,
  buttonProps,
}: EyeToggleButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className={className}
      onClick={() => setEyeIsOpen((eyeIsOpen) => !eyeIsOpen)}
      {...buttonProps}
    >
      {eyeIsOpen ? <Eye size={eyeSize} /> : <EyeClosed size={eyeSize} />}
    </button>
  );
};
