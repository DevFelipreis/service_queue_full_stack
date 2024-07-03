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
        };

        const [queue] = await knex<Queue>("queue")
            .insert({
                name: name.toLowerCase(),
                preferential,
                queue_started: new Date()
            })
            .returning("*");

        return res.status(201).json({ message: `${queue.name} criado com sucesso!`, queue });

    } catch (error: InstanceType<any>) {

        return res.status(500).json({ message: "Erro ao criar fila", error: error.message });

    }
};

export const getServiceQueue = async (req: Request, res: Response) => {
    try {

        const { name, open_service } = req.query;

        if (name) {
            const [queue] = await knex<Queue>("queue")
                .select("*")
                .where({ name: name as string })
                .orderBy("queue_started", "desc");
            return res.status(200).json({ queue });
        };

        if (open_service === "false") {
            const [queue] = await knex<Queue>("queue")
                .select("*")
                .where({ open_service: false })
                .orderBy("queue_started", "desc");;
            return res.status(200).json({ queue });
        };

        if (open_service === "true") {
            const [queue] = await knex<Queue>("queue")
                .select("*")
                .where({ open_service: true })
                .orderBy("queue_started", "desc");;
            return res.status(200).json({ queue });
        };

        const [queue] = await knex<Queue>("queue")
            .select("*")
            .orderBy("queue_started", "desc");;

        return res.status(200).json({ queue });

    } catch (error: InstanceType<any>) {

        return res.status(500).json({ message: "Erro ao listar fila", error: error.message });

    }
};