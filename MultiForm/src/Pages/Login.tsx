import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/app/store" // Adjust path if needed
import { setPersonalInfo } from "../../redux/app/personalInfoSlice";
import { setEducation } from "../../redux/app/educationSlice";
import { setAllFields } from "../../redux/app/projectsSlice";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.message || "Login failed");

      const { token, user } = data;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.formData) {
        const {
          name,
          email,
          addressLine1,
          addressLine2,
          city,
          state,
          zipcode,
          studying,
          institution,
          projects,
        } = user.formData;

        // Personal Info dispatch
        dispatch(
          setPersonalInfo({
            name,
            email,
            addressLine1,
            addressLine2: addressLine2 || "",
            city,
            state,
            zipcode,
          })
        );

        // Education dispatch
        dispatch(
          setEducation({
            studying,
            institution,
          })
        );
        localStorage.setItem("email", email);

        // Projects dispatch
        if (Array.isArray(projects)) {
          dispatch(
            setAllFields(
              projects.map((p: any) => ({
                name: p.name,
                description: p.description,
              }))
            )
          );
        }
      }

      navigate("/personal");
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      alert(err.message || "Could not log in");
    }
  };

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
      <p className="ml-4 text-2xl font-semibold text-gray-700">Loading...</p>
    </div>
  );
}

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Left side */}
      <div className="left w-[28%] h-screen">
        <div className="w-full h-full flex bg-gray-200">
          <form
            className="bg-gray-200 h-[60%] my-auto rounded-lg p-6 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-[20%] mx-auto rounded-full">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/000/403/516/original/modern-company-logo-design-vector.jpg"
                alt="logo"
              />
            </div>

            <div className="text-center font-sans font-semibold text-xl">
              <p>Welcome back!</p>
              <p>Sign in to your account</p>
            </div>

            <div className="w-[80%] mx-auto">
              <input
                required
                id="email"
                type="email"
                placeholder="Enter your Email"
                className="p-2 w-full rounded-lg bg-amber-300"
                onChange={handleChange}
              />
            </div>

            <div className="w-[80%] mx-auto">
              <input
                required
                id="password"
                type="password"
                placeholder="Enter password"
                className="p-2 bg-amber-300 rounded-lg w-full"
                onChange={handleChange}
              />
            </div>

            <div className="w-[65%] mx-auto my-6">
              <button
                type="submit"
                className="bg-black w-full p-2 cursor-pointer rounded-full text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="right w-[80%] h-full flex justify-center items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/001/991/652/original/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
          alt="login"
          className="object-cover w-[80%] h-[80%]"
        />
      </div>
    </div>
  );
}

export default Login;
