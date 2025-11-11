package ferreirandre.github.coffee_brewing_methods.repository;

import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoffeeMethodRepository extends JpaRepository<CoffeeMethod, Long> {
    List<CoffeeMethod> findByName(String name);
}
