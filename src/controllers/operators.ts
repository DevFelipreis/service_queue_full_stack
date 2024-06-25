import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import bcrypt from "bcrypt";
import { Operator } from "../types/Types";
dotenv.config();

export const createOperators = async (req: Request, res: Response) => {
    try {
        const { name, email, password, ticket_window } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!name || !email || !password || !ticket_window) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos corretamente" });
        }
        const [operator] = await knex<Operator>("operator")
            .insert({
                name: name.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword,
                ticket_window,
                service_started: new Date(),
            }).returning("*");
        return res.status(201).json({ message: `${operator.name} criado com sucesso!`, operator });
    }
    catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao criar operador", error: error.message });
    }
}
