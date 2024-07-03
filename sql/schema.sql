create database service_queue;

create table queue(
    id serial primary key,
    name varchar(255) not null,
    preferential boolean default false not null,
    open_service boolean default true not null,
    queue_started timestamp default now() not null,
    service_started timestamp default null,
    service_finished timestamp default null
);

create table operator(
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    ticket_window integer unique not null,
    open_service boolean default false not null
    
);