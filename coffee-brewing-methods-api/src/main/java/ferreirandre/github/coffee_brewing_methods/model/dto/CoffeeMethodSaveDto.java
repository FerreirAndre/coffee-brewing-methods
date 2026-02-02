package ferreirandre.github.coffee_brewing_methods.model.dto;

import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeDescription;
import ferreirandre.github.coffee_brewing_methods.model.entity.PourStep;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoffeeMethodSaveDto {
    private String name;
    private String type;
    private int waterTemperature;
    private String description;
    private CoffeeDescriptionDto coffeeDescription;
    private List<PourStepDto> steps = new ArrayList<>();
}
