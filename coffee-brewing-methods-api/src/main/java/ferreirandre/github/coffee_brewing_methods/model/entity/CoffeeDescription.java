package ferreirandre.github.coffee_brewing_methods.model.entity;

import ferreirandre.github.coffee_brewing_methods.model.enums.GrindSize;
import ferreirandre.github.coffee_brewing_methods.model.enums.RoastLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CoffeeDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private GrindSize grindSize;

    @Enumerated(EnumType.STRING)
    private RoastLevel roastLevel;
}
