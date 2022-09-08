package com.example.test_case.service;

import com.example.test_case.model.Item;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IItemService extends IGeneralService<Item>{
    List<Item> findItemByCustomerId(Long id);
}
