import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import { Queue } from "../types/Types";
dotenv.config();


export const validationNameServiceQueue = async (req: Request, res: Response, next: Function) => {
    try {
        const { name } = req.body;
        console.log(name);

        const queue = await knex<Queue>("queue").select("*").where({ name });
        if (!queue) {
            return res.status(400).json({ message: "Pessoa não encontrada" });
        }
        next();
    } catch (error: InstanceType<any>) {
        console.log(error);

        return res.status(500).json({ message: "Erro ao lisar fila", error: error.message });
    }
}