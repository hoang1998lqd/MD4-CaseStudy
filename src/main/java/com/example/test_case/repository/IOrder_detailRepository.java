package com.example.test_case.repository;

import com.example.test_case.model.Order_detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrder_detailRepository extends JpaRepository<Order_detail, Long> {

    @Query(value = "select * from order_detail where orders_id = ?1", nativeQuery = true)
    List<Order_detail> findAllByOrderId(@Param("id") Long id);
}
