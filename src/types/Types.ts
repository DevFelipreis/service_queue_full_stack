export type Operator = {
    id: string;
    name: string;
    email: string;
    password: string;
    ticketWindow: number;
    openQueue: boolean;
    serviceStarted: Date;
};

export type Queue = {
    id: string;
    name: string;
    preferential: boolean;
    open_service: boolean;
    queue_started: Date;
    operators: Operator[];
};