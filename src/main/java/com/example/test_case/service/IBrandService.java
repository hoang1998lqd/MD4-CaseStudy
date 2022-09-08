package com.example.test_case.service;

import com.example.test_case.model.Brand;

import java.util.List;

public interface IBrandService extends IGeneralService<Brand> {
    List<Brand> findBrandsByCategoryId(Long id);
}
