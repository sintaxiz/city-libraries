package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.entities.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}
