import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import type { PersonalInfoType } from "../types/PersonalInfoType";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../schemas/PeraonalInfoSchema";
import { setPersonalInfo } from "../../redux/app/personalInfoSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/app/store";
import { useEffect } from "react";

function Personal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfo = useSelector((state:RootState)=> state.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues:personalInfo
  });

  useEffect(() => {
    reset(personalInfo);
  }, [personalInfo, reset]);

  const onSubmit = async (data: PersonalInfoType) => {
    dispatch(setPersonalInfo(data));
    await axios.post("/api/personal", data);
    navigate("/education");
  };
  
  return (
    <div className="min-h-screen  bg-gray-50 flex items-center justify-center p-4"
    style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Personal Information</h2>

        <div>
          <label className="block mb-1 text-gray-600">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Address Line 1</label>
          <input
            {...register("addressLine1")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Street address"
          />
          {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Address Line 2</label>
          <input
            {...register("addressLine2")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-600">City</label>
            <input
              {...register("city")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-600">State</label>
            <input
              {...register("state")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Zipcode</label>
          <input
            {...register("zipcode")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Zipcode"
          />
          {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default Personal;
