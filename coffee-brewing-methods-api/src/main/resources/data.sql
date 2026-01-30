TRUNCATE TABLE pour_step CASCADE;
TRUNCATE TABLE coffee_method CASCADE;
TRUNCATE TABLE coffee_description CASCADE;

INSERT INTO coffee_description (id, grind_size, roast_level)
VALUES (1, 'MEDIUM', 'MEDIUM'),
       (2, 'MEDIUM_FINE', 'LIGHT'),
       (3, 'COARSE', 'MEDIUM_DARK');

INSERT INTO coffee_method (id, method_name, method_type, water_temperature, description, coffee_description_id)
VALUES (1, 'V60', 'POUR_OVER', 93,
        'Método de café coado japonês que resulta em uma bebida limpa e aromática. Ideal para destacar notas florais e frutadas do café.',
        1),
       (2, 'Aeropress', 'IMMERSION', 85,
        'Método versátil de preparo por imersão e pressão. Produz um café encorpado com baixa acidez em pouco tempo.',
        2),
       (3, 'French Press', 'IMMERSION', 95,
        'Prensa francesa clássica que produz café encorpado e rico em óleos naturais. Método simples e consistente.',
        3);

INSERT INTO pour_step (id, order_number, amount_grams, instructions, coffee_method_id)
VALUES (1, 1, 50, 'Bloom: Despeje 50g de água em movimentos circulares, molhando todo o pó. Aguarde 30-45 segundos.',
        1),
       (2, 2, 100, 'Primeira despejo: Adicione 100g de água em espiral do centro para fora, totalizando 150g.', 1),
       (3, 3, 100, 'Segunda despejo: Despeje mais 100g em movimentos circulares, totalizando 250g.', 1),
       (4, 4, 50,
        'Despejo final: Complete com os últimos 50g de água, atingindo 300g total. Tempo total: 2:30-3:00 min.', 1);

INSERT INTO pour_step (id, order_number, amount_grams, instructions, coffee_method_id)
VALUES (5, 1, 200, 'Adicione todo o café no Aeropress e despeje 200g de água rapidamente.', 2),
       (6, 2, 0, 'Mexa vigorosamente por 10 segundos para garantir extração uniforme.', 2),
       (7, 3, 0, 'Coloque o êmbolo e aguarde 1 minuto de infusão.', 2),
       (8, 4, 0, 'Pressione suavemente por 30 segundos até ouvir o silvo do ar. Tempo total: 1:40 min.', 2);

INSERT INTO pour_step (id, order_number, amount_grams, instructions, coffee_method_id)
VALUES (9, 1, 500, 'Adicione o café moído e despeje toda a água (500g) de uma vez.', 3),
       (10, 2, 0, 'Mexa gentilmente para submergir todo o pó de café.', 3),
       (11, 3, 0, 'Coloque a tampa com o êmbolo levantado e aguarde 4 minutos.', 3),
       (12, 4, 0, 'Pressione o êmbolo lentamente até o fundo. Sirva imediatamente para evitar sobre-extração.', 3);

SELECT setval('coffee_description_id_seq', (SELECT MAX(id) FROM coffee_description));
SELECT setval('coffee_method_id_seq', (SELECT MAX(id) FROM coffee_method));
SELECT setval('pour_step_id_seq', (SELECT MAX(id) FROM pour_step));