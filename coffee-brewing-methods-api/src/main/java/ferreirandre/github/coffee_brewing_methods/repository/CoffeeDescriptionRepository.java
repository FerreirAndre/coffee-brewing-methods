package ferreirandre.github.coffee_brewing_methods.repository;

import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeDescriptionRepository extends JpaRepository<CoffeeDescription,Long> {
}
