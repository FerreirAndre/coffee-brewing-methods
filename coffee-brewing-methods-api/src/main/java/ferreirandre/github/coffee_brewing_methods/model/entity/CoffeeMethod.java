package ferreirandre.github.coffee_brewing_methods.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity@Table(name = "coffee_method")
public class CoffeeMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "method_name")
    private String name;

    @Column(name = "method_type")
    private String type;

    private int waterTemperature;

    private String description;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "coffee_description_id")
    private CoffeeDescription coffeeDescription = null;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "coffeeMethod", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PourStep> steps;
}
