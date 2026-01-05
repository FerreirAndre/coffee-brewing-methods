package ferreirandre.github.coffee_brewing_methods.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
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

    @OneToOne(cascade = CascadeType.ALL)
    private CoffeeDescription coffeeDescription;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "coffeeMethod", orphanRemoval = true)
    private List<PourStep> steps;
}
