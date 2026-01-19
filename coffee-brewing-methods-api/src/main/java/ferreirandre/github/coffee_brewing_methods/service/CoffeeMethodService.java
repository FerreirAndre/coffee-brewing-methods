package ferreirandre.github.coffee_brewing_methods.service;


import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;

import java.util.List;

public interface CoffeeMethodService {
    List<CoffeeMethodDto> findAllCoffeeMethod();
    List<CoffeeMethodDto> findAllCoffeeMethodByType(String type);
    CoffeeMethodDetailsDto findCoffeeMethodById(Long id);
    String saveCoffeeMethod(CoffeeMethodSaveDto dto);
    void deleteCoffeeMethod(Long id);
    void updateCoffeeMethod(Long id, CoffeeMethodDto dto);
}
