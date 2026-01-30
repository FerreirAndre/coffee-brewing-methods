DROP TABLE IF EXISTS pour_step CASCADE;
DROP TABLE IF EXISTS coffee_method CASCADE;
DROP TABLE IF EXISTS coffee_description CASCADE;

CREATE TABLE coffee_description
(
    id          BIGSERIAL PRIMARY KEY,
    grind_size  VARCHAR(50) NOT NULL,
    roast_level VARCHAR(50) NOT NULL
);

CREATE TABLE coffee_method
(
    id                    BIGSERIAL PRIMARY KEY,
    method_name           VARCHAR(255) NOT NULL,
    method_type           VARCHAR(100) NOT NULL,
    water_temperature     INTEGER      NOT NULL,
    description           TEXT,
    coffee_description_id BIGINT,
    CONSTRAINT fk_coffee_description
        FOREIGN KEY (coffee_description_id)
            REFERENCES coffee_description (id)
);

CREATE TABLE pour_step
(
    id               BIGSERIAL PRIMARY KEY,
    order_number     INTEGER NOT NULL,
    amount_grams     INTEGER NOT NULL,
    instructions     TEXT    NOT NULL,
    coffee_method_id BIGINT  NOT NULL,
    CONSTRAINT fk_coffee_method
        FOREIGN KEY (coffee_method_id)
            REFERENCES coffee_method (id)
            ON DELETE CASCADE
);