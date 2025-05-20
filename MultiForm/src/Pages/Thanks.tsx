import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Thanks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <FaCheckCircle className="mx-auto text-green-500 w-16 h-16" />

        <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
        <p className="text-gray-600 text-lg">
          Your form has been successfully submitted. We’ll review your details shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Thanks;
