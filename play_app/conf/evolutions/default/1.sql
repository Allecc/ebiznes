--- !Downs
alter table sales_orders
    drop constraint fk_user_sales_order;
alter table users
    drop constraint fk_user_roles_users;
alter table order_products
    drop constraint fk_sales_orders_order_products;
alter table products
    drop constraint fk_category_products;
drop table users;
drop table user_roles;
drop table categories;
drop table products;
drop table sales_orders;
drop table order_products;

--- !Ups
create table users
(
    id          UUID         not null,
    providerid  varchar(255) not null,
    providerkey varchar(255) not null,
    first_name  varchar(255),
    last_name   varchar(255),
    full_name   varchar(255),
    email       varchar(255),
    avatarURL   varchar(255),
    activated   bool default true,
    role_id     integer      not null,
    constraint pk_users primary key (id)
);
create table user_roles
(
    id   serial       not null,
    role varchar(255) not null,
    constraint pk_user_roles primary key (id)
);
create table categories
(
    id   serial       not null,
    name varchar(255) not null,
    constraint pk_categories primary key (id)
);
create table products
(
    id             serial       not null,
    sku            varchar(255) not null,
    name           varchar(255) not null,
    description    text,
    regular_price  numeric default 0,
    discount_price numeric default 0,
    quantity       integer default 0,
    taxable        bool    default false,
    image          varchar(255),
    category       integer      not null,
    constraint pk_products primary key (id)
);
create table sales_orders
(
    id         UUID    not null,
    order_date date    not null,
    total      numeric not null,
    user_id    UUID    not null,
    constraint pk_sales_orders primary key (id)
);
create table order_products
(
    id          UUID         not null,
    order_id    UUID,
    sku         varchar(255) not null,
    name        varchar(255) not null,
    description text,
    image       varchar(255),
    price       numeric      not null,
    quantity    integer      not null,
    subtotal    numeric      not null,
    constraint pk_order_products primary key (id)
);

alter table users
    add constraint fk_user_roles_users
        foreign key (role_id)
            references user_roles (id);
alter table sales_orders
    add constraint fk_user_sales_order
        foreign key (user_id)
            references users (id);
alter table order_products
    add constraint fk_sales_orders_order_products
        foreign key (order_id)
            references sales_orders (id);
alter table products
    add constraint fk_category_products
        foreign key (category)
            references categories (id);

INSERT INTO user_roles(id, role)
VALUES (1, 'admin'),
       (2, 'user');
INSERT INTO categories(id, name)
VALUES (1, 'zabawki'),
       (2, 'plecionki'),
       (3, 'szycie'),
       (4, 'pieczenie');
INSERT INTO products(sku, name, description, regular_price, discount_price, quantity, taxable, image, category)
VALUES ('0000001',
        'Teddy Bears',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        100,
        80,
        40,
        true,
        'zabawki.jpg',
        1),
       ('0000002',
        'Pikachu',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        250,
        220,
        10,
        true,
        'pikachu.jpg',
        3),
       ('0000003',
        'Purse',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        50,
        40,
        10,
        true,
        'torebka.jpg',
        2),
       ('0000004',
        'Cookies',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        15,
        12,
        10,
        true,
        'ciastka.jpg',
        4);
