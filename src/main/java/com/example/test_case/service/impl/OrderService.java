package com.example.test_case.service.impl;

import com.example.test_case.model.Orders;
import com.example.test_case.model.Product;
import com.example.test_case.repository.IOrdersRepository;
import com.example.test_case.service.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrdersService {

    @Autowired
    IOrdersRepository ordersRepository;

    @Override
    public List<Orders> findAll() {
        List<Orders> orders = ordersRepository.findAll();
        List<Orders> ordersList = new ArrayList<>();
        for (Orders order : orders){
            if (order.getStatus_exist() != 0){
                ordersList.add(order);
            }
        }
        return ordersList;
    }

    @Override
    public Optional<Orders> findById(Long id) {
        return ordersRepository.findById(id);
    }

    @Override
    public Orders save(Orders orders) {
        LocalDateTime date_order = LocalDateTime.now();
        LocalDateTime date_ship = date_order.plusDays(2);
        orders.setDate_order(date_order);
        orders.setDate_ship(date_ship);
        return ordersRepository.save(orders);
    }


    //Truyền vào Id của Customer
    @Override
    public void delete(Long id) {
        List<Orders> orders = findOrdersByCustomerId(id);
        for (Orders order : orders){
            order.setStatus_exist(0);
            save(order);
        }

    }

    @Override
    public List<Orders> findOrdersByCustomerId(Long id) {
        return ordersRepository.findOrdersByCustomerId(id);
    }

    @Override
    public Long findNewOrderId() {
        return ordersRepository.findNewOrderId();
    }
}
