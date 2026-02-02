package ferreirandre.github.coffee_brewing_methods.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PourStepDto {
    private Long id;
    private int orderNumber;
    private int amountGrams;
    private String instructions;
}
