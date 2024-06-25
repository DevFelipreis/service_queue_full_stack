import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import { Queue } from "../types/Types";
dotenv.config();

export const createServiceQueue = async (req: Request, res: Response) => {
    try {
        const { name, preferential } = req.body;

        if (!name || !preferential) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos corretamente" });
        }

        const [queue] = await knex<Queue>("queue")
            .insert({ name, preferential, queue_started: new Date() })
            .returning("*");

        return res.status(201).json({ message: `${queue.name} criado com sucesso!`, queue });
    } catch (error: any) {
        return res.status(500).json({ message: "Erro ao criar fila", error: error.message });
    }
};