import { useForm, useFieldArray } from "react-hook-form";
import type { ProjectType } from "../types/ProjectType";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schemas/ProjectSchema";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllFields } from "../../redux/app/projectsSlice";
import axios from "axios";
import type { RootState } from "../../redux/app/store";

function Projects() {
  const projects = useSelector((state: RootState) => state.projects);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: projects,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = async (data: ProjectType) => {
    try {
      console.log(data,"Sachin Kumar 121212");
      
      const newData = {
        ...data,
        email: localStorage.getItem("email"),
      }
      dispatch(setAllFields(data.projects));
      await axios.post("/api/project", newData);
      
      navigate("/end");
      
    } catch (error) {
      console.error("Error submitting projects:", error);
    }
  };

  useEffect(() => {
    reset(projects);
  }, [projects, reset]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Your Projects
        </h2>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                {...register(`projects.${index}.name`)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
              {errors.projects?.[index]?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projects[index].name?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register(`projects.${index}.description`)}
                className="w-full border rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the project (optional)"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSubmit((data) => {
              dispatch(setAllFields(data.projects));
              navigate("/education");
            })}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={() => append({ name: "", description: "" })}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Project
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Projects;
