package com.example.test_case.controller;


import com.example.test_case.model.DTO.DTOProduct;
import com.example.test_case.model.Order_detail;
import com.example.test_case.model.Orders;
import com.example.test_case.model.Product;
import com.example.test_case.service.IOrder_detailService;
import com.example.test_case.service.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    IOrder_detailService detailService;

    @Autowired
    IOrdersService ordersService;

    @GetMapping
    private ResponseEntity<List<Orders>> findAllOrder() {
        return new ResponseEntity<>(ordersService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/order-detail")
    private ResponseEntity<List<Order_detail>> findAllOrderDetail() {
        return new ResponseEntity<>(detailService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<Orders> createOrder(@RequestBody Orders order){
        return new ResponseEntity<>(ordersService.save(order), HttpStatus.CREATED);
    }


    @PostMapping("/order-detail")
    private ResponseEntity<Order_detail> createOrderDetail(@RequestBody Order_detail order_detail){
        return new ResponseEntity<>(detailService.save(order_detail), HttpStatus.CREATED);
    }

    @PutMapping
    private ResponseEntity<Orders> updateOrder(@RequestBody Orders order){
        Optional<Orders> ordersOptional = ordersService.findById(order.getId());
        if(ordersOptional.isPresent()){
            return new ResponseEntity<>(ordersService.save(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{idCustomer}")
    private ResponseEntity<?> updateOrderStatusExist(@PathVariable Long idCustomer){
        ordersService.delete(idCustomer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Lấy ID mới nhất vừa tạo của Orders
    @GetMapping("/id-new-order")
    private ResponseEntity<Long> findNewOrderId() {
        return new ResponseEntity<>(ordersService.findNewOrderId(), HttpStatus.OK);
    }
}
