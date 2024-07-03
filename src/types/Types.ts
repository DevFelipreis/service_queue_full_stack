export type Operator = {
    id: string;
    name: string;
    email: string;
    password: string;
    ticket_window: number;
    open_queue: boolean;
    service_started: Date;
};

export type Queue = {
    id: string;
    name: string;
    preferential: boolean;
    open_service: boolean;
    queue_started: Date;
    operators: Operator[];
};