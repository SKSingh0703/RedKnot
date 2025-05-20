import prisma from "../prisma/prisma";

import { Request, Response } from "express";

export const submitPersonalDetails = async (req: Request, res: Response) => {
    try {
        const {name, email, addressLine1, addressLine2, city, state, zipcode} = req.body;

        const existing = await prisma.userForm.findFirst({where :{email: email}});
        if(existing){

            const updated = await prisma.userForm.update({
                where: { email: email },
                data: {
                    name,
                    email,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    zipcode
                }
            });
            return res.status(200).json({ message: "Personal Info updated successfully", updated });
        }

        const created = await prisma.userForm.create({
            data: {
            name,
            email,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            studying: true,
            institution: "",
            projects: {
                create: [] 
            }
            }
        });

        res.status(201).json({ message: "Personal Info saved successfully", created });

    } catch (error) {
        res.status(500).json({ message: "Error saving personal Info",error });
    }
}