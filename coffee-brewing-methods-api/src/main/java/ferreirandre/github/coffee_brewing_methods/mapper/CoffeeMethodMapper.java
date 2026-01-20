package ferreirandre.github.coffee_brewing_methods.mapper;

import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CoffeeMethodMapper {
    CoffeeMethod toEntity(CoffeeMethodSaveDto dto);
    @Mapping(target="grindSize", expression = "java(entity.getCoffeeDescription() != null ? "
            + "entity.getCoffeeDescription().getGrindSize().name():null)")
    CoffeeMethodDto toDto(CoffeeMethod entity);
    CoffeeMethodDetailsDto toDetailsDto(CoffeeMethod entity);

    @BeanMapping
    void updateEntityFromDto(CoffeeMethodDto dto, @MappingTarget CoffeeMethod entity);
}
