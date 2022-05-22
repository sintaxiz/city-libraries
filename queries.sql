drop view if exists borrowings_view;
create view borrowings_view as
select b.take_date as take_date,
       l.name      as library,
       w.name      as worker,
       r.name      as reader,
       p.name      as book
from borrowing b
         inner join publication p on p.id = b.publication_id
         inner join library l on l.id = b.library_id
         inner join worker w on w.id = b.worker_id
         inner join reader r on r.id = b.reader_id
order by take_date;

select *
from borrowings_view;

/*  1.  Получить список читателей с заданными характеристиками:
        студентов указанного учебно-го заведения, факультета,
        научных работников по определенной тематике и т.д. */
create or replace function find_students(universityParam varchar)
    returns table
            (
                readerId int
            )

as
$$
select reader_id
from reader
         inner join student s on reader.id = s.id
    and lower(s.university) like (lower(universityParam) || '%')
$$
    language SQL;

create or replace function find_schoolboys(schoolParam varchar, gradeParam varchar)
    returns table
            (
                readerId int
            )

as
$$
select reader_id
from reader
         inner join schoolboy s on reader.id = s.id
--     and lower(s.school) like (lower(schoolParam) || '%')
--     and lower(s.grade) like (lower(gradeParam) || '%')
$$
    language SQL;




/* 2. указанное произведение (literature) -> список читателей */
create or replace function find_readers_with_literature(literature varchar, begin_date timestamp default now(),
                                                        end_date timestamp default null)
    returns table
            (
                readerName      varchar,
                publicationName varchar,
                library         varchar,
                borrowingDate   timestamp
            )
as
$$
select r.name, p.name, lib.name, b.take_date
from borrowing b
         inner join publication p on p.id = b.publication_id
    --                     and b.take_date >= begin_date
--                     and (b.return_date <= end_date or b.return_date is null)
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on pl.literature_id = l.id and lower(l.title) like ('%' || lower(literature) || '%')
         inner join reader r on r.id = b.reader_id
         inner join reader_library rl on r.id = rl.reader_id
         inner join library lib on b.library_id = lib.id;
$$
    language SQL;

/* 3. указанное издание (publication) -> список читателей */
select r.name
from borrowing b
         inner join publication p on p.id = b.publication_id and
                                     p.name = 'Идиот /* Федор Достоевский'
         inner join reader r on r.id = b.reader_id;

/* 4. Получить перечень читателей, которые в течение указанного промежутка времени получа-ли издание
   с некоторым произведением, и название этого издания. */
select r.name as reader
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.take_date BETWEEN '01-01-2021' and '01-01-2023'
         inner join publication p on p.id = b.publication_id
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on l.id = pl.literature_id and l.title = 'Идиот';

/* 5. указаны читатель и дата (reader_id, date) -> перечень изданий (publication),
   библиотека выдачи книги = той, где читатель зарегистрирован*/
select r.name as reader, p.name as publication
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.take_date BETWEEN '01-01-2021' and '01-01-2023'

         inner join reader_library rl on r.id = rl.reader_id and
                                         rl.library_id = b.library_id

         inner join publication p on p.id = b.publication_id;

/* 6. указаны читатель и дата (reader_id, date) -> перечень изданий (publication),
   библиотека выдачи книги = той, где читатель НЕ зарегистрирован*/
select r.name as reader, p.name as publication
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.take_date BETWEEN '01-01-2021' and '01-01-2023'

         inner join reader_library rl on r.id = rl.reader_id and
                                         rl.library_id != b.library_id

         inner join publication p on p.id = b.publication_id;

/*7.	Получить список литературы, которая в настоящий момент выдана
        с определенной полки некоторой библиотеки. */
select p.name, borr.take_date
from publication p
         inner join borrowing borr on p.id = borr.publication_id
         inner join library l on borr.library_id = l.id and l.id = 5
         inner join bookshelf bs on p.bookshelf_id = bs.id
         inner join rack r on r.id = bs.rack_id and r.id = 1;

/*8.	Выдать список читателей, которые в течение
        обозначенного периода были обслужены ука-занным библиотекарем. */
select r.name, count(*)
from borrowing b
         inner join worker on b.worker_id = 1 and
                              ((b.take_date between '01-01-2021' and '01-01-2023')
                                  or (b.return_date between '01-01-2021' and '01-01-2023'))
         inner join reader r on r.id = b.reader_id
group by r.name;


/* 9.	Получить данные о выработке библиотекарей
   (число обслуженных читателей в указанный период времени). */
select w.name, count(*) as reader_count
from worker w
         inner join borrowing b on w.id = b.worker_id and
                                   ((b.take_date between '01-01-2021' and '01-01-2023')
                                       or (b.return_date between '01-01-2021' and '01-01-2023'))
group by w.name;

/* 10.	Получить список читателей с просроченным сроком литературы. */
select r.name, count(*)
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                ((b.take_date + interval '1' day * b.return_term) < current_date)
    and (b.return_date IS NULL)
group by r.name;

/*  11.	Получить перечень указанной литературы, которая поступила (была списана) в
   течение некоторого периода. */
select l.title, p.receipt_date
from (select * from publication p where p.receipt_date between '01-01-2021' and '01-01-2022') p
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on l.id = pl.literature_id;

/* 12.	Выдать список библиотекарей, работающих
   в указанном читальном зале некоторой биб-лиотеки. */
select w.name
from library l
         inner join room r on l.id = r.library_id and l.id = 1 and r.id = 1
         inner join room_worker rw on r.id = rw.room_id
         inner join worker w on rw.worker_id = w.id;

/*  13.	Получить список читателей, не посещавших
   библиотеку в течение указанного времени. */
select r.name
from reader r
where not exists(select *
                 from borrowing b
                 where r.id = b.reader_id
                   and ((b.take_date between '01-01-2021' and '01-01-2023')
                     or (b.return_date between '01-01-2021' and '01-01-2023')));

/* 14.	Получить список инвентарных номеров и названий из библиотечного фонда,
   в которых со-держится указанное произведение. */
select l.title, p.name, p.id
from literature l
         inner join publication_literature pl on l.id = pl.literature_id and l.id = 2
         inner join publication p on pl.publication_id = p.id;

/* 15.	Выдать список инвентарных номеров и названий из библиотечного фонда,
        в которых содержатся произведения указанного автора.*/
select l.title, p.name, p.id
from literature l
         inner join publication_literature pl on l.id = pl.literature_id
    and l.author = 'Фёдор Достоевский'
         inner join publication p on pl.publication_id = p.id;

/* 16.	Получить список самых популярных произведений. */
select l.title, count(*)
from borrowing
         inner join publication p on p.id = borrowing.publication_id
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on l.id = pl.literature_id
group by l.id
order by count(*) desc
limit 3;
