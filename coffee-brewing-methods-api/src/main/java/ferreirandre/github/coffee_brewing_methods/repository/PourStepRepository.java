package ferreirandre.github.coffee_brewing_methods.repository;

import ferreirandre.github.coffee_brewing_methods.model.entity.PourStep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PourStepRepository extends JpaRepository<PourStep, Long> {
}
