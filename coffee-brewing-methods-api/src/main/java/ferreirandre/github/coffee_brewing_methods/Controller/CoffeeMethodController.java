package ferreirandre.github.coffee_brewing_methods.Controller;

import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;
import ferreirandre.github.coffee_brewing_methods.service.CoffeeMethodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coffee-methods")
@RequiredArgsConstructor
public class CoffeeMethodController {

    private final CoffeeMethodService service;

    @GetMapping
    public ResponseEntity<List<CoffeeMethodDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/types/{types}")
    public ResponseEntity<List<CoffeeMethodDto>> findAllByType(@PathVariable String type) {
        return ResponseEntity.ok(service.findAllByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoffeeMethodDetailsDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody @Valid CoffeeMethodSaveDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoffeeMethodDetailsDto> update(
            @PathVariable Long id,
            @RequestBody @Valid CoffeeMethodSaveDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
