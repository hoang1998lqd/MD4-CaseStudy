package com.example.test_case.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "order_deatail", schema = "shop_demo_1", catalog = "")
public class OrderDeatailEntity {
    @Basic
    @Column(name = "product_id")
    private long productId;
    @Basic
    @Column(name = "order_id")
    private long orderId;
    @Basic
    @Column(name = "quantity")
    private int quantity;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDeatailEntity that = (OrderDeatailEntity) o;
        return productId == that.productId && orderId == that.orderId && quantity == that.quantity && id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, orderId, quantity, id);
    }
}
