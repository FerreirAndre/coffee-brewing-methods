package ferreirandre.github.coffee_brewing_methods.mapper;

import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDetailsDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodDto;
import ferreirandre.github.coffee_brewing_methods.model.dto.CoffeeMethodSaveDto;
import ferreirandre.github.coffee_brewing_methods.model.entity.CoffeeMethod;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CoffeeMethodMapper {
    CoffeeMethod toEntity(CoffeeMethodSaveDto dto);
    CoffeeMethodDto toDto(CoffeeMethod entity);

    CoffeeMethodDetailsDto toDetailsDto(CoffeeMethod entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CoffeeMethodDto dto, @MappingTarget CoffeeMethod entity);
}
