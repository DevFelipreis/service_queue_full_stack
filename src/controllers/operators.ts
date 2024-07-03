import { Request, Response } from "express";
import dotenv from "dotenv";
import { knex } from "../database/connection";
import bcrypt from "bcrypt";
import { Operator } from "../types/Types";
import jwt_user_token from "jsonwebtoken";
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();
interface CustomJwtPayload extends JwtPayload {
    userId: string;
}


export const loginOperator = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos corretamente" });
        }
        const operator = await knex<Operator>("operator")
            .select("*")
            .where({ email: email })
            .first();
        if (!operator) {
            return res.status(400).json({ message: "Email ou senha incorretos" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, operator.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Email ou senha incorretos" });
        }
        const { id,
            name,
            email: Email,
            ticket_window,
            open_queue: open_queue,
            service_started } = operator;
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
        const { id,
            name: Name,
            email: Email,
            ticket_window: Ticket_window,
            open_queue: open_queue,
            service_started } = operator;

        return res.status(200).json({
            usuario: {
                id,
                name,
                email,
                ticket_window,
                open_queue: Boolean(open_queue),
                service_started,
            },
        });
    }
    catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao criar operador", error: error.message });
    }
}

export const updateOperators = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
        const userId = decoded!.id;

        const currentOperator: any = await knex<Operator>("operator").where({ id: userId }).first();

        const { name, email, password, ticket_window } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [newOperator] = await knex<Operator>("operator")
            .update({
                name: name || currentOperator.name,
                password: hashedPassword || currentOperator.password,
                email: email || currentOperator.email,
                ticket_window: ticket_window || currentOperator.ticket_window,
            })
            .where({ id: userId })
            .returning("*");

        const { id, name: Name, email: Email, ticket_window: Ticket_window, open_queue: open_queue, service_started } = newOperator;
        return res.status(200).json({
            usuario: {
                id,
                name: Name,
                email: Email,
                ticket_window: Ticket_window,
                open_queue: Boolean(open_queue),
                service_started,
            },
        });
    } catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao atualizar operador", error: error.message });
    }
};

export const deleteOperators = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
        const userId = decoded!.id;
        const operator = await knex<Operator>("operator").where({ id: userId }).first();
        return res.status(200).json({ message: "Operador deletado com sucesso" });
    } catch (error: InstanceType<any>) {
        return res.status(500).json({ message: "Erro ao deletar operador", error: error.message });
    }
}



