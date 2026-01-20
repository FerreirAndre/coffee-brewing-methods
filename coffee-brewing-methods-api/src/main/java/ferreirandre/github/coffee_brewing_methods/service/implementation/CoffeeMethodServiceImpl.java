package ferreirandre.github.coffee_brewing_methods.service.implementation;

import ferreirandre.github.coffee_brewing_methods.mapper.CoffeeMethodMapper;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import ferreirandre.github.coffee_brewing_methods.repository.CoffeeMethodRepository;
import ferreirandre.github.coffee_brewing_methods.service.CoffeeMethodService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoffeeMethodServiceImpl implements CoffeeMethodService {

    @Autowired
    private CoffeeMethodRepository repository;

    private CoffeeMethodMapper mapper;

    @Override
    public List<CoffeeMethodDto> findAllCoffeeMethod() {
        List<CoffeeMethod> coffeeMethods = repository.findAll();
        List<CoffeeMethodDto> coffeeMethodDtos = coffeeMethods.stream().map(mapper::toDto).toList();
        return coffeeMethodDtos;
    }

    @Override
    public List<CoffeeMethodDto> findAllCoffeeMethodByType(String type) {
        List<CoffeeMethod> coffeeMethods = repository.findByType(type);
        List<CoffeeMethodDto> coffeeMethodDtos = coffeeMethods.stream().map(mapper::toDto).toList();
        return coffeeMethodDtos;
    }

    @Override
    public CoffeeMethodDetailsDto findCoffeeMethodById(Long id) {
        CoffeeMethod coffeeMethod = repository.findById(id).orElseThrow(()->(new RuntimeException("Method not Found.")));
        CoffeeMethodDetailsDto coffeeMethodDetailsDto = mapper.toDetailsDto(coffeeMethod);
        return coffeeMethodDetailsDto;
    }

    @Override
    public String saveCoffeeMethod(CoffeeMethodSaveDto dto) {
        CoffeeMethod entity = mapper.toEntity(dto);
        repository.save(entity);
        return entity.getName();
    }

    @Override
    public void deleteCoffeeMethod(Long id) {
        repository.findById(id).orElseThrow(()->(new RuntimeException("Method not found.")));
        repository.deleteById(id);
    }

    @Override
    public void updateCoffeeMethod(Long id, CoffeeMethodDto dto) {
        CoffeeMethod entity = repository.findById(id).orElseThrow(()->(new RuntimeException("Method not Found.")));
        mapper.updateEntityFromDto(dto, entity);
        repository.save(entity);
    }
}
