package ferreirandre.github.coffee_brewing_methods.service.implementation;

import ferreirandre.github.coffee_brewing_methods.mapper.CoffeeMethodMapper;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import ferreirandre.github.coffee_brewing_methods.model.entity.PourStep;
import ferreirandre.github.coffee_brewing_methods.repository.CoffeeMethodRepository;
import ferreirandre.github.coffee_brewing_methods.service.CoffeeMethodService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CoffeeMethodServiceImpl implements CoffeeMethodService {

    private final CoffeeMethodRepository repository;

    private final CoffeeMethodMapper mapper;

    @Override
    public List<CoffeeMethodDto> findAll() {
        return repository.findAll().stream().map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CoffeeMethodDto> findAllByType(String type) {
        return repository.findByType(type).stream().map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CoffeeMethodDetailsDto findById(Long id) {
        return repository.findById(id).map(mapper::toDetailsDto).orElseThrow(() ->
                (new EntityNotFoundException("Method not Found.")));
    }

    @Override
    public String create(CoffeeMethodSaveDto dto) {
        CoffeeMethod entity = mapper.toEntity(dto);
        if(entity.getSteps()!= null){
            entity.getSteps().forEach(step->step.setCoffeeMethod(entity));
        }
        repository.save(entity);
        return entity.getName();
    }

    @Override
    public Long delete(Long id) {
        if (!repository.existsById(id)){
            throw new EntityNotFoundException("coffee method not found: " + id);
        }
        repository.deleteById(id);
        return id;
    }

    @Override
    public Long update(Long id, CoffeeMethodSaveDto dto) {
        CoffeeMethod entity = repository.findById(id)
                .orElseThrow(()->(new EntityNotFoundException("Method not Found.")));

        mapper.updateEntityFromDto(dto, entity);
        if(dto.getSteps()!=null) {
            entity.getSteps().clear();
            List<PourStep> newSteps = dto.getSteps().stream()
                    .map(mapper::stepDtoToEntity)
                    .peek(step->step.setCoffeeMethod(entity))
                    .toList();

            entity.getSteps().addAll(newSteps);
        }
        CoffeeMethod updated = repository.save(entity);
        return updated.getId();
    }
}
