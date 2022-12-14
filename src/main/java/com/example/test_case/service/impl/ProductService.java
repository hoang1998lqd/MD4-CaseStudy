package com.example.test_case.service.impl;

import com.example.test_case.model.DTO.DTOProduct;
import com.example.test_case.model.Product;
import com.example.test_case.repository.ProductRepository;
import com.example.test_case.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DTOProductService dtoProductService;


    @Override
    public List<Product> findAll() {
        List<Product> products = productRepository.findAll();
        List<Product> productList = new ArrayList<>();
        for (Product product : products){
            if (product.getStatus() != 0 ){
                productList.add(product);
            }
        }
        return productList;
    }


    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {;
        return productRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
            product.setStatus(0);
            productRepository.save(product);
        }
    }

    @Override
    public Long findIdNewProduct() {
        return productRepository.findIdNewProduct();
    }

    @Override
    public List<DTOProduct> getAllDTO() {
        return dtoProductService.createDtoProducts();
    }
}
