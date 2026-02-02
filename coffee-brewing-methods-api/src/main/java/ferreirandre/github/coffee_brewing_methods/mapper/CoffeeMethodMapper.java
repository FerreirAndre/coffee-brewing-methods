package ferreirandre.github.coffee_brewing_methods.mapper;

import ferreirandre.github.coffee_brewing_methods.model.dto.*;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeDescription;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import ferreirandre.github.coffee_brewing_methods.model.entity.PourStep;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CoffeeMethodMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "steps", qualifiedByName = "mapStepsToEntity")
    @Mapping(target = "coffeeDescription", source = "coffeeDescription")
    CoffeeMethod toEntity(CoffeeMethodSaveDto dto);

    CoffeeMethodDto toDto(CoffeeMethod entity);

    @Mapping(target = "steps", source = "steps")
    @Mapping(target = "coffeeDescription", source = "coffeeDescription")
    CoffeeMethodDetailsDto toDetailsDto(CoffeeMethod entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "steps", ignore = true)
    @Mapping(target = "coffeeDescription", ignore = true)
    void updateEntityFromDto(CoffeeMethodDto dto, @MappingTarget CoffeeMethod entity);

    @Mapping(target = "id", source = "id")
    PourStepDto stepToDto(PourStep steps);

    List<PourStepDto> stepsToDto(List<PourStep> steps);

    @Mapping(target = "id", ignore = true)
    CoffeeDescription descriptionDtoToEntity(CoffeeDescriptionDto dto);

    CoffeeDescriptionDto descriptionToDto(CoffeeDescription entity);
}
