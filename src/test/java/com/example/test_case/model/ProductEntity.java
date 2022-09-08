package com.example.test_case.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product", schema = "shop_demo_1", catalog = "")
public class ProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "price")
    private double price;
    @Basic
    @Column(name = "amount")
    private int amount;
    @Basic
    @Column(name = "color")
    private String color;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "status")
    private int status;
    @Basic
    @Column(name = "category_id")
    private long categoryId;
    @Basic
    @Column(name = "brand_id")
    private long brandId;
    @Basic
    @Column(name = "discount")
    private Integer discount;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public long getBrandId() {
        return brandId;
    }

    public void setBrandId(long brandId) {
        this.brandId = brandId;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductEntity that = (ProductEntity) o;
        return id == that.id && Double.compare(that.price, price) == 0 && amount == that.amount && status == that.status && categoryId == that.categoryId && brandId == that.brandId && Objects.equals(name, that.name) && Objects.equals(color, that.color) && Objects.equals(description, that.description) && Objects.equals(discount, that.discount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, amount, color, description, status, categoryId, brandId, discount);
    }
}
