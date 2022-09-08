package entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "orders", schema = "shop_demo_1", catalog = "")
public class OrdersEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;
    @Basic
    @Column(name = "date_order", nullable = false)
    private Date dateOrder;
    @Basic
    @Column(name = "Date_ship", nullable = false)
    private Date dateShip;
    @Basic
    @Column(name = "description", nullable = true, length = 255)
    private String description;
    @Basic
    @Column(name = "status_exist", nullable = false)
    private int statusExist;
    @Basic
    @Column(name = "status_order", nullable = false)
    private int statusOrder;
    @Basic
    @Column(name = "customer_id", nullable = false)
    private long customerId;
    @Basic
    @Column(name = "status_pay", nullable = false)
    private int statusPay;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(Date dateOrder) {
        this.dateOrder = dateOrder;
    }

    public Date getDateShip() {
        return dateShip;
    }

    public void setDateShip(Date dateShip) {
        this.dateShip = dateShip;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatusExist() {
        return statusExist;
    }

    public void setStatusExist(int statusExist) {
        this.statusExist = statusExist;
    }

    public int getStatusOrder() {
        return statusOrder;
    }

    public void setStatusOrder(int statusOrder) {
        this.statusOrder = statusOrder;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public int getStatusPay() {
        return statusPay;
    }

    public void setStatusPay(int statusPay) {
        this.statusPay = statusPay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrdersEntity that = (OrdersEntity) o;
        return id == that.id && statusExist == that.statusExist && statusOrder == that.statusOrder && customerId == that.customerId && statusPay == that.statusPay && Objects.equals(dateOrder, that.dateOrder) && Objects.equals(dateShip, that.dateShip) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dateOrder, dateShip, description, statusExist, statusOrder, customerId, statusPay);
    }
}
