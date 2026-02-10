# ☕ Coffee Methods API

API RESTful para gerenciamento de métodos de preparo de café, desenvolvida com Java 21 e Spring Boot 3.

## 📋 Sobre o Projeto

Esta API permite cadastrar, consultar, atualizar e deletar métodos de preparo de café, incluindo informações detalhadas sobre:

- Tipo de preparo (Pour Over, Imersão, etc)
- Temperatura da água
- Descrição do café (moagem, torra, quantidade)
- Passos detalhados do preparo

## 🚀 Tecnologias

- **Java 21**
- **Spring Boot 3**
- **PostgreSQL 16**
- **Spring Data JPA / Hibernate**
- **MapStruct** - Mapeamento de DTOs
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

## 📦 Pré-requisitos

- Java 21+
- PostgreSQL 16+
- Maven 3.8

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/FerreirAndre/coffee-brewing-methods.git
cd coffee-methods-api
```

### 2. Configure o banco de dados

Crie um banco de dados PostgreSQL da maneira que preferir, eu utilizo docker

```bash
docker run --name (container_name) -e POSTGRES_USER=(user) -e POSTGRES_PASSWORD=(password) -e POSTGRES_DB=(database_name) -e TZ=UTC -p 5432:5432 -v (container_name)_data:/var/lib/postgresql/data -d postgres:16
```

### 3. Configure o `application.properties`

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/database_name
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# SQL Initialization
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true
```

### 4. Execute a aplicação

```bash
./mvnw spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

## 📚 Endpoints

### Base URL

```
http://localhost:8080/coffee-methods
```

### Listar todos os métodos

```http
GET /coffee-methods
```

**Resposta:**

```json
[
  {
    "id": 1,
    "name": "V60",
    "type": "POUR_OVER",
    "waterTemperature": 93,
    "description": "Método de café coado japonês..."
  }
]
```

---

### Buscar por tipo

```http
GET /coffee-methods/types/{type}
```

**Exemplo:**

```http
GET /coffee-methods/types/POUR_OVER
```

---

### Buscar por ID (com detalhes)

```http
GET /coffee-methods/{id}
```

**Resposta:**

```json
{
  "id": 1,
  "name": "V60",
  "type": "POUR_OVER",
  "waterTemperature": 93,
  "description": "Método de café coado japonês...",
  "coffeeDescription": {
    "id": 1,
    "grindSize": "MEDIUM",
    "roastLevel": "MEDIUM",
    "coffeeAmountGrams": 15
  },
  "steps": [
    {
      "id": 1,
      "orderNumber": 1,
      "amountGrams": 50,
      "instructions": "Bloom: Despeje 50g de água..."
    }
  ]
}
```

---

### Criar novo método

```http
POST /coffee-methods
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Chemex",
  "type": "POUR_OVER",
  "waterTemperature": 94,
  "description": "Método elegante que produz café limpo e suave",
  "coffeeDescription": {
    "grindSize": "MEDIUM_COARSE",
    "roastLevel": "MEDIUM",
    "coffeeAmountGrams": 20
  },
  "steps": [
    {
      "orderNumber": 1,
      "amountGrams": 60,
      "instructions": "Bloom: Despeje 60g de água e aguarde 45 segundos"
    },
    {
      "orderNumber": 2,
      "amountGrams": 200,
      "instructions": "Despeje 200g de água em círculos lentos"
    },
    {
      "orderNumber": 3,
      "amountGrams": 140,
      "instructions": "Complete com os últimos 140g até totalizar 400g"
    }
  ]
}
```

**Resposta:**

```json
"Coffee method created successfully"
```

---

### Atualizar método

```http
PUT /coffee-methods/{id}
Content-Type: application/json
```

**Body:** (mesmo formato do POST)

**Resposta:** Objeto `CoffeeMethodDetailsDto` atualizado

---

### Deletar método

```http
DELETE /coffee-methods/{id}
```

**Resposta:** `204 No Content`

---

## 🎯 Modelos de Dados

### Enums

#### GrindSize (Moagem)

```
COARSE          - Grossa
MEDIUM_COARSE   - Média-grossa
MEDIUM          - Média
MEDIUM_FINE     - Média-fina
FINE            - Fina
EXTRA_FINE      - Extra-fina
```

#### RoastLevel (Torra)

```
LIGHT         - Clara
MEDIUM_LIGHT  - Média-clara
MEDIUM        - Média
MEDIUM_DARK   - Média-escura
DARK          - Escura
```

#### Method Types (Tipos de Preparo)

```
POUR_OVER    - Coado/Filtrado
IMMERSION    - Imersão
ESPRESSO     - Espresso
COLD_BREW    - Cold Brew
```

---

## 🧪 Exemplos de Uso

### Com cURL

#### Listar todos

```bash
curl http://localhost:8080/coffee-methods
```

#### Buscar por ID

```bash
curl http://localhost:8080/coffee-methods/1
```

#### Criar novo método

```bash
curl -X POST http://localhost:8080/coffee-methods \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aeropress Invertido",
    "type": "IMMERSION",
    "waterTemperature": 85,
    "description": "Variação invertida do Aeropress",
    "coffeeDescription": {
      "grindSize": "FINE",
      "roastLevel": "MEDIUM",
      "coffeeAmountGrams": 17
    },
    "steps": [
      {
        "orderNumber": 1,
        "amountGrams": 220,
        "instructions": "Posicione invertido e adicione água"
      },
      {
        "orderNumber": 2,
        "amountGrams": 0,
        "instructions": "Mexa por 10 segundos"
      },
      {
        "orderNumber": 3,
        "amountGrams": 0,
        "instructions": "Aguarde 1:30 e pressione"
      }
    ]
  }'
```

#### Deletar

```bash
curl -X DELETE http://localhost:8080/coffee-methods/{id}
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas

#### coffee_method

```sql
id                      BIGSERIAL PRIMARY KEY
method_name            VARCHAR(255) NOT NULL
method_type            VARCHAR(100) NOT NULL
water_temperature      INTEGER NOT NULL
description            TEXT
coffee_description_id  BIGINT (FK)
```

#### coffee_description

```sql
id                    BIGSERIAL PRIMARY KEY
grind_size           VARCHAR(50) NOT NULL
roast_level          VARCHAR(50) NOT NULL
coffee_amount_grams  INTEGER NOT NULL
```

#### pour_step

```sql
id                 BIGSERIAL PRIMARY KEY
order_number       INTEGER NOT NULL
amount_grams       INTEGER NOT NULL
instructions       TEXT NOT NULL
coffee_method_id   BIGINT NOT NULL (FK)
```

---

## 📁 Estrutura do Projeto

```
src
└── main
    ├── java
    │   └── ferreirandre
    │       └── github
    │           └── coffee_brewing_methods
    │               ├── CoffeeBrewingMethodsApplication.java
    │               ├── configuration
    │               │   └── WebConfig.java
    │               ├── controller
    │               │   └── CoffeeMethodController.java
    │               ├── mapper
    │               │   └── CoffeeMethodMapper.java
    │               ├── model
    │               │   ├── dto
    │               │   │   ├── CoffeeDescriptionDto.java
    │               │   │   ├── CoffeeMethodDetailsDto.java
    │               │   │   ├── CoffeeMethodDto.java
    │               │   │   ├── CoffeeMethodSaveDto.java
    │               │   │   └── PourStepDto.java
    │               │   ├── entity
    │               │   │   ├── CoffeeDescription.java
    │               │   │   ├── CoffeeMethod.java
    │               │   │   └── PourStep.java
    │               │   └── enums
    │               │       ├── GrindSize.java
    │               │       └── RoastLevel.java
    │               ├── repository
    │               │   ├── CoffeeDescriptionRepository.java
    │               │   ├── CoffeeMethodRepository.java
    │               │   └── PourStepRepository.java
    │               └── service
    │                   ├── CoffeeMethodService.java
    │                   └── implementation
    │                       └── CoffeeMethodServiceImpl.java
    └── resources
        ├── application.properties
        ├── data.sql
        └── schema.sql
```

---

## 🛠️ Desenvolvimento

### Compilar

```bash
./mvnw clean compile
```

### Gerar JAR

```bash
./mvnw clean package
```

### Executar JAR

```bash
java -jar target/coffee-methods-api-0.0.1-SNAPSHOT.jar
```

---

## 👤 Autor

André - [FerreirAndre](https://github.com/FerreirAndre)

---

**Desenvolvido com ☕ e ❤️**
