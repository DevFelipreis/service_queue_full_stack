import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import bcrypt from "bcrypt";
import { Operator } from "../types/Types";
import jwt_user_token from "jsonwebtoken";
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();


export const loginOperator = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos corretamente" });
        }
        const operator = await knex<Operator>("operator").select("*").where({ email: email }).first();
        if (!operator) {
            return res.status(400).json({ message: "Email ou senha incorretos" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, operator.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Email ou senha incorretos" });
        }
        const { id, name, email: Email, ticket_window, open_queue: open_queue, service_started } = operator;
        const token = jwt_user_token.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });

        return res.status(200).json({
            usuario: {
                id,
                name,
                email,
                ticket_window,
                open_queue: Boolean(open_queue),
                service_started,
            },
            token,
        });
    } catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao logar operador", error: error.message });
    }
}

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
