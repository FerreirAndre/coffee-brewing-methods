INSERT INTO coffee_description (id, grind_size, roast_level) VALUES
                                                                 (1, 'MEDIUM', 'LIGHT'),
                                                                 (2, 'COARSE', 'MEDIUM'),
                                                                 (3, 'FINE', 'DARK');
INSERT INTO coffee_method (
    id,
    method_name,
    method_type,
    water_temperature,
    description,
    coffee_description_id
) VALUES
      (
          1,
          'V60',
          'POUR_OVER',
          92,
          'Método filtrado com despejos controlados',
          1
      ),
      (
          2,
          'Prensa Francesa',
          'IMMERSION',
          94,
          'Método por infusão total com prensa',
          2
      ),
      (
          3,
          'Aeropress',
          'PRESSURE',
          88,
          'Método híbrido com pressão manual',
          3
      );
INSERT INTO pour_step (
    id,
    order_number,
    amount_grams,
    instructions,
    coffee_method_id
) VALUES
-- V60
(1, 1, 40,  'Bloom: despejar 40g e aguardar 30s', 1),
(2, 2, 260, 'Despejar o restante em movimentos circulares', 1),

-- Prensa Francesa
(3, 1, 350, 'Adicionar toda a água de uma vez', 2),
(4, 2, 0,   'Aguardar 4 minutos e pressionar lentamente', 2),

-- Aeropress
(5, 1, 200, 'Adicionar água e mexer por 10s', 3),
(6, 2, 0,   'Pressionar lentamente por 30s', 3);