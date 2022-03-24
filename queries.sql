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
         inner join student s on reader.id = s.id and reader.category_id = s.category_id;

/* 2. указанное произведение (literature) -> список читателей */
select r.name
from borrowing
    inner join publication p on p.id = borrowing.publication_id
    inner join publication_literature pl on p.id = pl.publication_id
    inner join literature l on pl.literature_id = l.id and l.title = 'Идиот'
    inner join reader r on borrowing.reader_id = r.id;

/* 3. указанное издание (publication) -> список читателей */
select r.name
from borrowing
         inner join publication p on p.id = borrowing.publication_id and p.name = 'Идиот -- Федор Достоевский'
         inner join reader r on r.id = borrowing.reader_id
