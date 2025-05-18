export const EmptyJobDetail = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Job Selected
      </h2>
      <p className="text-gray-600 text-sm">
        Click on a job from the list to view its details here.
      </p>
    </div>
  );
};
