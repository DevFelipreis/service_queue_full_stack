create database service_queue;

create table queue(
    id serial primary key,
    name varchar(255) not null,
    preferential boolean default false,
    open_service boolean default false,
    queue_started timestamp default now()
);