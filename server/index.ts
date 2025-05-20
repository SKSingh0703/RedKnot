import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import personalRouter from "./routes/personal";
import educationRouter from "./routes/education";
import projectRouter from "./routes/projects";
import { getFormData } from "./controllers/formData";
import router from "./routes/auth";


dotenv.config();
const app = express();
const PORT:number = parseInt(process.env.PORT || "5000");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.use('/api/personal', personalRouter);
app.use('/api/education', educationRouter);
app.use('/api/project', projectRouter);
app.use('/api/auth',router); 
app.get('/api/form/:email',getFormData);

app.get('/',(req:express.Request,res:express.Response)=>{
    res.send("Server is running");
});  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});