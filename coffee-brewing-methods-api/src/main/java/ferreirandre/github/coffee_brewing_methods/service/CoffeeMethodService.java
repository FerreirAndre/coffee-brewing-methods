package ferreirandre.github.coffee_brewing_methods.service;


import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;

import java.util.List;

public interface CoffeeMethodService {
    List<CoffeeMethodDto> findAllCoffeeMethod();
    List<CoffeeMethodDto> findAllCoffeeMethodByName(String coffeeMethodName);
    CoffeeMethodDetailsDto findCoffeeMethodById(Long id);
    void deleteCoffeeMethod(Long id);
    void updateCoffeeMethod(Long id, CoffeeMethodDto coffeeMethodDto);
}
