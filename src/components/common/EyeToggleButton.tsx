import { Eye, EyeClosed } from "lucide-react";
import React from "react";

interface EyeToggleButtonProps {
  eyeIsOpen: boolean;
  setEyeIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  eyeSize?: number;
}

export const EyeToggleButton = ({
  eyeIsOpen,
  setEyeIsOpen,
  className,
  eyeSize = 20,
}: EyeToggleButtonProps) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => setEyeIsOpen((eyeIsOpen) => !eyeIsOpen)}
    >
      {eyeIsOpen ? <Eye size={eyeSize} /> : <EyeClosed size={eyeSize} />}
    </button>
  );
};
