package ferreirandre.github.coffee_brewing_methods.service.implementation;

import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import ferreirandre.github.coffee_brewing_methods.repository.CoffeeMethodRepository;
import ferreirandre.github.coffee_brewing_methods.service.CoffeeMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoffeeMethodServiceImpl implements CoffeeMethodService {

    @Autowired
    private CoffeeMethodRepository repository;

    @Override
    public List<CoffeeMethodDto> findAllCoffeeMethod() {
        List<CoffeeMethod> coffeeMethods = repository.findAll();
        return List.of();
    }

    @Override
    public List<CoffeeMethodDto> findAllCoffeeMethodByName(String coffeeMethodName) {
        return List.of();
    }

    @Override
    public CoffeeMethodDetailsDto findCoffeeMethodById(Long id) {
        return null;
    }

    @Override
    public void deleteCoffeeMethod(Long id) {

    }

    @Override
    public void updateCoffeeMethod(Long id, CoffeeMethodDto coffeeMethodDto) {

    }
}
