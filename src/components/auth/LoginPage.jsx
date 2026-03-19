import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { loginUser } from "../store/auth";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const isDark = useSelector((state) => state.theme.isDark);

  const validateEmail = (e) => {
    const value = e.target.value;
    if (validator.isEmail(value)) {
      setEmailError();
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, navigate, setEmailError));
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 dark:bg-gray-900 font-sans px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="mb-2 text-gray-500 dark:text-gray-300 flex justify-center">
            <h2>Welcome to task management</h2>
          </div>

          <div className="mb-2 text-gray-500 dark:text-gray-300 flex justify-center">
            <h2>Login in into your account</h2>
          </div>

          <form
            onSubmit={loginHandler}
            className="flex flex-col gap-2 w-full max-w-md"
          >
            <div>
              <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black border border-gray-400 dark:text-gray-300"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e);
                  }}
                />
              </div>
            </div>
            {emailError && <p>{emailError}</p>}

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
    </div>
  );
}
