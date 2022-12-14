package com.example.test_case.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer status;

    private int discount;


    //    @JsonIgnore
    @ManyToOne
    private Brand brand;

//    @JsonIgnore
    @ManyToOne
    private Category category;

}
