import { useNavigate } from "react-router-dom";

export default function ProtectedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-xl font-semibold text-red-500 mb-2">
        You need to login to access this page
      </h2>

      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
      >
        Go to Home
      </button>
    </div>
  );
}
