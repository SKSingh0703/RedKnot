import prisma from "../prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleLogin = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      const newPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: newPassword,
        },
      });
      return res.status(201).json({ message: "User created", user: newUser });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, "Redknot", {
      expiresIn: "1d",
    });

    const formData = await prisma.userForm.findFirst({
      where: {
        email,
      },
      include: {
        projects: true,
      },
    });
    
    res.status(200).json({ token, user: { email: user.email ,formData} });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
