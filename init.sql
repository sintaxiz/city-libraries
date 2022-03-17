-- LIBRARY --
create table library
(
    id       integer primary key,
    location text not null,
    name     text
);

create table room
(
    id         integer primary key,
    library_id integer references library
);

create table rack
(
    id      integer primary key,
    room_id integer not null references room
);

create table bookshelf
(
    id      integer primary key,
    rack_id integer not null references rack
);


-- READERS --

create table reader_category
(
    id   integer primary key,
    name text not null
);

insert into reader_category (id, name)
values (1, 'schoolboy'),
       (2, 'student');

create table reader
(
    id          integer primary key,
    category_id integer references reader_category,
    unique (id, category_id),
    name        text not null
);

create table schoolboy
(
    id          integer primary key,
    category_id integer default 1,
    foreign key (id, category_id) references reader (id, category_id),
    school      text,
    grade       text
);

create table student
(
    id          integer primary key,
    category_id integer default 2,
    foreign key (id, category_id) references reader (id, category_id),
    university  text
);

create table reader_library
(
    reader_id  integer references reader,
    library_id integer references library,
    unique (reader_id, library_id)
);

-- LITERATURE --

create table literature_category
(
    id   integer primary key,
    name text not null
);

insert into literature_category (id, name)
values (1, 'literature'),
       (2, 'textbook');

create table literature
(
    id          integer primary key,
    category_id integer references literature_category,
    unique (id, category_id),
    title       text not null,
    author      text not null,
    year        text
);

create table fiction
(
    id          integer primary key,
    category_id integer default 1,
    foreign key (id, category_id) references literature (id, category_id),
    translation text
);

create table textbook
(
    id          integer primary key,
    category_id integer default 2,
    foreign key (id, category_id) references literature (id, category_id),
    field       text
);

-- PUBLICATIONS --

create table publication
(
    id           integer primary key,
    bookshelf_id integer,
    type         text
);

create table publication_literature
(
    id             integer primary key,
    publication_id integer references publication,
    literature_id  integer references literature
);

-- WORKERS --

create table worker
(
    id   integer primary key,
    name text not null
);

create table room_worker
(
    id        integer primary key,
    room_id   integer references room,
    worker_id integer references worker
);

-- BORROWING --

create table rule
(
    id        integer primary key,
    rule_text text not null
);

create table publication_rule
(
    id             integer primary key,
    publication_id integer references publication,
    rule_id        integer references rule
);

create table borrowing
(
    id             integer primary key,
    reader_id      integer references reader,
    publication_id integer references publication,
    worker_id      integer references worker,
    date           timestamp
);
