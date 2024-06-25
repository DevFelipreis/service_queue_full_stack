create database service_queue;

create table queue(
    id serial primary key,
    name varchar(255) not null,
    preferential boolean default false,
    open_service boolean default true,
    queue_started timestamp default now()
);

create table operator(
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    ticket_window integer,
    open_service boolean default false
    service_started timestamp default now()
);