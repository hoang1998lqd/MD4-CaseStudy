package com.example.test_case.service;

import com.example.test_case.model.DTO.DTOProduct;
import com.example.test_case.model.Product;

import java.util.List;
import java.util.Optional;
import com.example.test_case.model.DTO.DTOProduct;
import com.example.test_case.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IProductService extends IGeneralService<Product> {
    Long findIdNewProduct();
    List<DTOProduct> getAllDTO();
}
