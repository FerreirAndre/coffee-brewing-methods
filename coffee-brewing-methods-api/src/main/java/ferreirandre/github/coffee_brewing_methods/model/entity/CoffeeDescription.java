package ferreirandre.github.coffee_brewing_methods.model.entity;

import ferreirandre.github.coffee_brewing_methods.model.enums.GrindSize;
import ferreirandre.github.coffee_brewing_methods.model.enums.RoastLevel;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity@Table(name = "coffee_description")
public class CoffeeDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private GrindSize grindSize;

    @Column(name = "coffee_grams")
    private Integer coffeeGrams;

    @Enumerated(EnumType.STRING)
    private RoastLevel roastLevel;
}
