import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import { Operator } from "../types/Types";
dotenv.config();

export const validationEmailOperator = async (req: Request, res: Response, next: Function) => {
    try {

        const { email } = req.body;

        if (email) {
            const operator = await knex<Operator>("operator").select("*").where({ email: email }).first();
            if (operator) {
                return res.status(400).json({ message: "Operador ja existe" });
            };
        };

        next();

    } catch (error: InstanceType<any>) {

        return res.status(500).json({ message: "Erro ao lisar fila", error: error.message });
    }
}

export const validationTicketWindow = async (req: Request, res: Response, next: Function) => {
    try {

        const { ticket_window } = req.body;

        if (ticket_window) {
            const operator = await knex<Operator>("operator").select("*").where({ ticket_window: ticket_window }).first();
            if (operator) {
                return res.status(400).json({ message: "Guichê já está ocupado" });
            };
        };

        next();

    } catch (error: InstanceType<any>) {

        return res.status(500).json({ message: "Erro ao lisar fila", error: error.message });

    }
}