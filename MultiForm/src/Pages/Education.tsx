import { useForm } from "react-hook-form";
import type { EducationType } from "../types/EducationType";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema } from "../schemas/EducationSchema";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store"; // ✅ Correct this import path
import { useEffect, useState } from "react";
import { setEducation } from "../../redux/app/educationSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Education() {
  const education = useSelector((state: RootState) => state.education);
  console.log(education);
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EducationType>({
    resolver: zodResolver(educationSchema),
    defaultValues: education,
  });

  const [study, setStudying] = useState(education.studying ?? false);

  useEffect(() => {
    reset(education);
    setStudying(education.studying ?? false);
  }, [education, reset]);

  const onSubmit = async (data: EducationType) => {
    try {
    console.log(data);
    console.log("Sachin Kumar 121212");
  
    dispatch(setEducation({
      ...data,
      institution: data.institution ?? "",
    }));
    const newData = {
      ...data,
      email:localStorage.getItem("email"),
    }
    const res = await axios.post("/api/education", newData);
    console.log(res);
    navigate("/project");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Education Information
        </h2>

        <div>
          <label className="block mb-2 text-gray-700">Are you currently studying?</label>
          <div className="flex  justify-center space-x-4">
            <label className="inline-flex items-center">
              <input onClick={()=>setStudying(true)}
                type="radio"
                value="true"
                checked={study=== true}
                {...register("studying")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input onClick={()=>setStudying(false)}
                type="radio"
                value="false"
                checked={study === false}
                {...register("studying")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        {study && (
          <div>
            <label className="block mb-1 text-gray-600">Institution</label>
            <input
              {...register("institution")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your institution name"
            />
            {errors.institution && (
              <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/personal")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Education;
