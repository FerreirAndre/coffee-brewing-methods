package ferreirandre.github.coffee_brewing_methods.model.dto;

import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CoffeeMethodDto {
    private Long id;
    private String name;
    private String type;
    private int waterTemperature;
    private String description;

}
