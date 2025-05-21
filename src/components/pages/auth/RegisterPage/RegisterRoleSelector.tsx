import { Dispatch, SetStateAction } from "react";
import { User, Briefcase } from "lucide-react";

export type Role = "client" | "translator";

interface IRegisterRoleSelector {
  setSelectedRole: Dispatch<SetStateAction<Role | null>>;
}

const RegisterRoleSelector = ({ setSelectedRole }: IRegisterRoleSelector) => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-center">Choose your role</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
          {/* Client */}
          <button
            onClick={() => setSelectedRole("client")}
            className="flex cursor-pointer flex-col items-center p-6 rounded-2xl border shadow-md transition-all duration-200 bg-white text-gray-700 hover:border-blue-400 hover:shadow-lg"
          >
            <Briefcase size={40} className="mb-2" />
            <span className="text-lg font-semibold">Client</span>
            <p className="text-sm opacity-80 mt-1">
              I’m looking for translators :/
            </p>
          </button>

          {/* Translator */}
          <button
            onClick={() => setSelectedRole("translator")}
            className="flex cursor-pointer flex-col items-center p-6 rounded-2xl border shadow-md transition-all duration-200 bg-white text-gray-700 hover:border-green-400 hover:shadow-lg"
          >
            <User size={40} className="mb-2" />
            <span className="text-lg font-semibold">Translator</span>
            <p className="text-sm opacity-80 mt-1">
              I’m the one u looking for :D
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoleSelector;
