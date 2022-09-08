package com.example.test_case.service;

import com.example.test_case.model.Cart;

import java.util.List;

public interface ICartService extends IGeneralService<Cart>{
    public List<Cart> findAllByCustomerId(Long id);
}
