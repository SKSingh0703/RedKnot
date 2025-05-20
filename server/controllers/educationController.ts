import { Request, Response } from "express";
import prisma from "../prisma/prisma";

export const submitEducationDetails = async (req: Request, res: Response) => {
    try {
        const { email, institution, studying } = req.body;

        const existing = await prisma.userForm.findFirst({ where: { email } });

        if (existing) {
            const updated = await prisma.userForm.update({
                where: { id: existing.id },
                data: {
                    institution,
                    studying,
                },
            });
            return res.status(200).json({ message: "Education Info updated successfully", updated });
        }

        return res.status(404).json({ message: "User not found. Please submit personal info first." });

    } catch (error) {
        res.status(500).json({ message: "Error saving education info", error });
    }
};
