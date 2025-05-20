import prisma from "../prisma/prisma";

export const submitProjectDetails = async (req: any, res: any) => {
  try {
    const { email, projects } = req.body;

    const user = await prisma.userForm.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please submit personal info first." });
    }

    await prisma.project.deleteMany({ where: { userFormId: user.id } });

    const added = await prisma.project.createMany({
      data: projects.map((p: any) => ({
        name: p.name,
        description: p.description,
        userFormId: user.id,
      })),
    });

    res.status(201).json({ message: "Projects added successfully", added });

  } catch (error) {
    res.status(500).json({ message: "Error saving project info", error });
  }
};
