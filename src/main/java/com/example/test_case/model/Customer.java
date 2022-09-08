package com.example.test_case.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.groups.Default;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String emailAddress;

    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")
    private String password;


    private String name;


    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})")
    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false,length = 400)
    private String address;

    @Column(length = 400)
    private String image;

    private Integer status;


    @ManyToMany(targetEntity = Role.class,fetch = FetchType.EAGER)
    private Set<Role> role;
}
