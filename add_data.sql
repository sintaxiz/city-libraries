-- LIBRARY --

insert into library (id, location, name)
values (1, 'Вычислительный центр СО РАН, проспект Академика Лаврентьева, 6', 'ГПНТБ СО РАН'),
       (2, 'бульвар Молодёжи, 16, 20 помещение; 1 этаж; 2 подъезд', 'Детская библиотека им. Ю.Д. Дмитриева'),
       (3, 'Восход, 15', 'Государственная публичная научно-техническая библиотека СО РАН'),
       (4, 'Тружеников, 16а; 1 этаж', 'Библиотека им. М.М. Зощенко'),
       (5, 'Крылова 15; 1 этаж', 'Новосибирская областная специальная библиотека для незрячих и слабовидящих');

insert into room (id, library_id)
values (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5);

insert into rack (id, room_id)
values (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5);

insert into bookshelf(id, rack_id)
values (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5);


-- READERS --

insert into reader (id, category_id, name)
    (values (1, 2, 'Александра Заляева'),
            (2, 2, 'Антон Кудинов'),
            (3, 1, 'Василий Кокунин'),
            (4, 1, 'Дядя Фёдор'),
            (5, NULL, 'Александр Литвинов'),
            (6, 2, 'Никита Панин'));

insert into schoolboy (id, school, grade)
values (3, 'Средняя общеобразовательная школа №38', '8Д');

insert into student (id, university)
values (1, 'НГУ'),
       (2, 'НГУ'),
       (6, 'НГТУ');

insert into reader_library (reader_id, library_id)
values (1, 1),
       (2, 5),
       (3, 2),
       (4, 4),
       (5, 3),
       (6, 5);


-- LITERATURE --

insert into literature(id, category_id, title, author, year)
values (1, 1, 'Портрет Дориана Грея', 'Оскар Уайльд', '1890'),
       (2, 1, 'Идиот', 'Фёдор Достоевский', '1868'),
       (3, 2, 'Введение в операционные системы', 'Д. В. Иртегов', '2008'),
       (4, 1, 'Мартин Иден', 'Джек Лондон', '1909'),
       (5, NULL, 'Метафизика', 'Аристотель', 'IV век до н. э.'),
       (6, NULL, 'Что это было', 'Хармс Даниил', '1940'),
       (7, 2, 'Введение в системы баз данных', 'Дейт Крис Дж.', '1975');

insert into textbook(id, field)
values (3, 'Информационные технологии, операционные системы'),
       (7, 'Сетевые технологии');

insert into fiction(id, translation)
values (1, NULL),
       (2, NULL),
       (4, 'Заяицкий С.С.');


-- PUBLICATIONS --
insert into publication(id, bookshelf_id, type)
values (1, 1, 'книга'),
       (2, 2, 'книга'),
       (3, 3, 'книга'),
       (4, 4, 'книга'),
       (5, 5, 'книга');

insert into publication_literature(id, publication_id, literature_id)
values (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 4),
       (5, 5, 5);

-- WORKERS --

insert into worker
values (1, 'Литвинова Галина Ивановна'),
       (2, 'Осипов Григорий Григорьевич'),
       (3, 'Ломова Дарья Николаевна'),
       (4, 'Новосельева Валентина Ненельевна'),
       (5, 'Усенко Анатолий Романович');

insert into room_worker (id, room_id, worker_id)
values (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 4),
       (5, 5, 5);

-- BORROWING --

insert into rule(id, rule_text)
values (1, 'Выдача только до недели'),
       (2, 'Можно читать только в читальном зале');

insert into publication_rule(id, publication_id, rule_id)
values (1, 1, 1),
       (2, 2, 2);

insert into borrowing(id, reader_id, publication_id, worker_id, date)
values (1, 2, 1, 3, '2022-03-16 14:39:23'),
       (2, 2, 2, 3, '2022-03-14 11:39:53'),
       (3, 4, 5, 4, '2022-02-01 10:55:16'),
       (4, 1, 4, 1, '2022-03-04 14:30:06'),
       (5, 5, 3, 5, '2022-03-01 15:39:12')
