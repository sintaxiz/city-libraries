/*  1.  Получить список читателей с заданными характеристиками:
        студентов указанного учебно-го заведения, факультета,
        научных работников по определенной тематике и т.д. */
select random();
/* Сколько студентов в каком универе? */
select university, count(*) from student
group by university;

/* список студентов */
select university, name
from reader
         inner join student s on reader.id = s.id and reader.category_id = s.category_id;
