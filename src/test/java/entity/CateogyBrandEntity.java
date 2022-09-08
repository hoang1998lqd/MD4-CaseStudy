package entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "category_brand", schema = "shop_demo_1", catalog = "")
public class CateogyBrandEntity {
    @Basic
    @Column(name = "category_id", nullable = false)
    private long categoryId;
    @Basic
    @Column(name = "brand_id", nullable = false)
    private long brandId;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

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
        CateogyBrandEntity that = (CateogyBrandEntity) o;
        return categoryId == that.categoryId && brandId == that.brandId && id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, brandId, id);
    }
}
