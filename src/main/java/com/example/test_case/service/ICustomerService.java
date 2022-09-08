package com.example.test_case.service;

import com.example.test_case.model.Customer;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface ICustomerService extends UserDetailsService, IGeneralService<Customer> {
    Optional<Customer> findByEmailAddressAndPassword(String email, String password);

    Optional<Customer> findByName (String name);

    Optional<Customer> findByEmailAddress (String email);
    Long findNewCustomerId();

}
