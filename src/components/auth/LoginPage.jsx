import { useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui/NavBar";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const loginHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("userEmail", email);
    dispatch(authAction.login());
    navigate("/welcome");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 font-sans px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-2 text-gray-500 flex justify-center">
          <h2>Welcome to task management</h2>
        </div>

        <div className="mb-2 text-gray-500 flex justify-center">
          <h2>Login in into your account</h2>
        </div>

        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-2 w-full max-w-md"
        >
          <div>
            <label className="block text-sm/6 font-medium text-gray-500">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black border border-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Login In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
