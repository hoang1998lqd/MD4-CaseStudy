package com.example.test_case.service;

import com.example.test_case.model.Order_detail;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrder_detailService extends IGeneralService<Order_detail> {
    List<Order_detail> findAllByOrderId( Long id);
}
