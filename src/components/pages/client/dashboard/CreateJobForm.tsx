import { IJob } from "@/lib/interfaces";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ICreateJobFormProps {
  clientId: string;
  createJobAction: (
    jobData: IJob
  ) => Promise<{ success: boolean; message: string }>;
}

export const CreateJobForm = ({
  clientId,
  createJobAction,
}: ICreateJobFormProps) => {
  const { register, handleSubmit, reset } = useForm<IJob>();

  const onSubmit = async (data: IJob) => {
    const jobData = { ...data, clientId };
    const res = await createJobAction(jobData);
    if (res.success) {
      reset();
      toast(res.message);
    } else {
      toast(res.message, { style: { color: "red" } });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <input
        type="text"
        {...register("title")}
        placeholder="Job title"
        className="w-full p-2 border rounded"
      />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        {...register("sourceLanguage")}
        placeholder="Source Language"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        {...register("targetLanguage")}
        placeholder="Target Language"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        {...register("fee")}
        placeholder="Fee"
        className="w-full p-2 border rounded"
      />

      <select
        {...register("paymentType")}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Payment Type</option>
        <option value="FIXED">Fixed</option>
        <option value="HOURLY">Hourly</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded ml-auto block"
      >
        Create Job
      </button>
    </form>
  );
};
