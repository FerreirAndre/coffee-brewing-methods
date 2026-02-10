package ferreirandre.github.coffee_brewing_methods.model.dto;

import ferreirandre.github.coffee_brewing_methods.model.enums.GrindSize;
import ferreirandre.github.coffee_brewing_methods.model.enums.RoastLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoffeeDescriptionDto {
    private Long id;
    private Integer coffeeGrams;
    private GrindSize grindSize;
    private RoastLevel roastLevel;
}
