package ferreirandre.github.coffee_brewing_methods.service;


import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;

import java.util.List;

public interface CoffeeMethodService {
    List<CoffeeMethodDto> findAll();
    List<CoffeeMethodDto> findAllByType(String type);
    CoffeeMethodDetailsDto findById(Long id);
    String create(CoffeeMethodSaveDto dto);
    void delete(Long id);
    CoffeeMethodDetailsDto update(Long id, CoffeeMethodSaveDto dto);
}
