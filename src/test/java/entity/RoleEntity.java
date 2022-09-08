package entity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "role", schema = "shop_demo_1", catalog = "")
public class RoleEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;

    private Set<CustomerEntity> customerEntities = new LinkedHashSet<>();

    @OneToMany(mappedBy = "role", orphanRemoval = true)
    public Set<CustomerEntity> getCustomerEntities() {
        return customerEntities;
    }

    public RoleEntity setCustomerEntities(Set<CustomerEntity> customerEntities) {
        this.customerEntities = customerEntities;
        return this;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoleEntity that = (RoleEntity) o;
        return id == that.id && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
