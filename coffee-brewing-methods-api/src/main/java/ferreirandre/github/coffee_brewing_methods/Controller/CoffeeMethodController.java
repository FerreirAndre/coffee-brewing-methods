package ferreirandre.github.coffee_brewing_methods.Controller;

import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import ferreirandre.github.coffee_brewing_methods.service.CoffeeMethodService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/coffee-method")
public class CoffeeMethodController {

    @Autowired
    private CoffeeMethodService service;

    @GetMapping
    public ResponseEntity<List<CoffeeMethodDto>> getAllMethods(){
        var methodsDto = service.findAllCoffeeMethod();
        return ResponseEntity.ok(methodsDto);
    }
}
