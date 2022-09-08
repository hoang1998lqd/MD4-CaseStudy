package com.example.test_case.service;

import com.example.test_case.model.Orders;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrdersService extends IGeneralService<Orders> {
    List<Orders> findOrdersByCustomerId( Long id);
    Long findNewOrderId();
}
