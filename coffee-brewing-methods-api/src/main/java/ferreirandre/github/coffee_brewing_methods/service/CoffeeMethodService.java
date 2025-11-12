package ferreirandre.github.coffee_brewing_methods.service;


public interface CoffeeMethodService {
    List<CoffeeMethodDto> findAllCoffeeMethod();
    CoffeeMethodDto findCoffeeMethodByName(String coffeeMethodName);
    void deleteCoffeeMethod(Long id);
    CoffeeMethodDto updateCoffeeMethod(Long id, CoffeeMethodDto coffeeMethodDto);
}
