package com.example.test_case.repository;

import com.example.test_case.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrdersRepository extends JpaRepository<Orders, Long> {
    @Query(value = "select * from orders where customer_id = ?1", nativeQuery = true)
    List<Orders> findOrdersByCustomerId(@Param("id") Long id);

    @Query(value = "select max(id) from orders", nativeQuery = true)
    Long findNewOrderId();
}
