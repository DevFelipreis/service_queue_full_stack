import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import { Operator } from "../types/Types";
dotenv.config();

export const createOperators = async (req: Request, res: Response) => {
    try {
        const { name, email, password, ticket_window } = req.body;
        if (!name || !email || !password || !ticket_window) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos corretamente" });
        }
        const queue = await knex<Operator>("queue")
            .insert({
                name: name.toLowerCase(),
                email: email.toLowerCase(),
                password,
                ticket_window,
                service_started: new Date(),
            }).returning
        return res.status(201).json({ message: `${queue.name} criado com sucesso!`, queue });
    }
    catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao criar operador", error: error.message });
    }
}
