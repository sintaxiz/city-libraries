create view borrowings_view as
select b.date as date, l.name as library, w.name as worker,
       r.name as reader, p.name as book
from borrowing b
    inner join publication p on p.id = b.publication_id
    inner join library l on l.id = b.library_id
    inner join worker w on w.id = b.worker_id
    inner join reader r on r.id = b.reader_id
order by date;

select * from borrowings_view;

/*  1.  Получить список читателей с заданными характеристиками:
        студентов указанного учебно-го заведения, факультета,
        научных работников по определенной тематике и т.д. */
select random();
/* Сколько студентов в каком универе? */
select university, count(*)
from student
group by university;

/* список студентов */
select university, name
from reader
         inner join student s on reader.id = s.id;

create view


/* 2. указанное произведение (literature) -> список читателей */
select r.name
from borrowing b
         inner join publication p on p.id = borrowing.publication_id
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on pl.literature_id = l.id and l.title = 'Идиот'
         inner join reader r on r.id = b.reader_id;

/* 3. указанное издание (publication) -> список читателей */
select r.name
from borrowing b
         inner join publication p on p.id = b.publication_id and
                                     p.name = 'Идиот -- Федор Достоевский'
         inner join reader r on r.id = b.reader_id;

/* 4. Получить перечень читателей, которые в течение указанного промежутка времени получа-ли издание
   с некоторым произведением, и название этого издания. */
select r.name as reader, b.date as date, p.name as publication
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.date BETWEEN '01-01-2021' and '01-01-2023'
         inner join publication p on p.id = b.publication_id
         inner join publication_literature pl on p.id = pl.publication_id
         inner join literature l on l.id = pl.literature_id and l.title = 'Идиот';

/* 5. указаны читатель и дата (reader_id, date) -> перечень изданий (publication),
   библиотека выдачи книги = той, где читатель зарегистрирован*/
select r.name as reader, p.name as publication
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.date BETWEEN '01-01-2021' and '01-01-2023'

         inner join reader_library rl on r.id = rl.reader_id and
                                         rl.library_id = b.library_id

         inner join publication p on p.id = b.publication_id;

/* 6. указаны читатель и дата (reader_id, date) -> перечень изданий (publication),
   библиотека выдачи книги = той, где читатель НЕ зарегистрирован*/
select r.name as reader, p.name as publication
from borrowing b
         inner join reader r on r.id = b.reader_id and
                                b.date BETWEEN '01-01-2021' and '01-01-2023'

         inner join reader_library rl on r.id = rl.reader_id and
                                         rl.library_id != b.library_id

         inner join publication p on p.id = b.publication_id;