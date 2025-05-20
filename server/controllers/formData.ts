import prisma from "../prisma/prisma";

export const getFormData = async (req:any,res:any)=>{
    try {
        const email = req.params.email;

        const formData = await prisma.userForm.findFirst({
            where: {
                email: email,
            },
            include: {
                projects: true,
            },
        });

        if(!formData) {
            return res.status(404).json({ message: "Form data not found" });
        }

        return res.status(200).json({ formData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}