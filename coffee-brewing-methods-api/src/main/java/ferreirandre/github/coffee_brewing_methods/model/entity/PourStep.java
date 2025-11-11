package ferreirandre.github.coffee_brewing_methods.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PourStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int orderNumber;

    private int amountGrams;

    private String instructions;

    @ManyToOne
    private CoffeeMethod coffeeMethod;
}
