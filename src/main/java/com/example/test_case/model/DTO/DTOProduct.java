package com.example.test_case.model.DTO;

import com.example.test_case.model.ImageURL;
import com.example.test_case.model.Product;

import java.util.List;

public class DTOProduct {
    private Product product;
    private List<String> imageURLS;

    public DTOProduct() {
    }

    public DTOProduct(Product product, List<String> imageURLS) {
        this.product = product;
        this.imageURLS = imageURLS;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<String> getImageURLS() {
        return imageURLS;
    }

    public void setImageURLS(List<String> imageURLS) {
        this.imageURLS = imageURLS;
    }
}
