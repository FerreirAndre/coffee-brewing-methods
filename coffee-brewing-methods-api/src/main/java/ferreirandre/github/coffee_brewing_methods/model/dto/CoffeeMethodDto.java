package ferreirandre.github.coffee_brewing_methods.model.dto;

import java.util.List;

public class CoffeeMethodDto {
    private Long id;
    private String name;
    private String type;
    private int waterTemperature;
    private String description;
    private CoffeeDescriptionDto coffeeDescription;
    private List<PourStepDto> steps;
}
