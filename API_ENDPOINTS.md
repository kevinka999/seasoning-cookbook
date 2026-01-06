# Mapeamento de Endpoints - Seasoning Cookbook API

## Índice

1. [Rotas Públicas](#rotas-públicas)
2. [Rotas Protegidas](#rotas-protegidas)
3. [Autenticação](#autenticação)
4. [Modelos de Dados](#modelos-de-dados)

---

## Rotas Públicas

### 1. GET /pokemons/search

**Descrição**: Buscar Pokemons por nome

**Método**: `GET`

**Rota**: `/pokemons/search`

**Protegida**: ❌ Não (pública)

**Parâmetros (Query)**:
- `name` (string, **obrigatório**): Nome do pokemon para busca
- `limit` (number, opcional): Limite de resultados (1-100, default: 10)

**Exemplo de Request**:
```
GET /pokemons/search?name=pikachu&limit=20
```

**Resposta**:
- **Status**: `200 OK`
- **Tipo**: `Pokemon[]`

```typescript
[
  {
    _id: string;
    registrationNumber: string;
    name: string;
    bucket: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
    types: PokemonType[];
    eggGroups: EggGroup[];
  }
]
```

---

### 2. GET /recipes

**Descrição**: Buscar receitas com filtros e ordenação

**Método**: `GET`

**Rota**: `/recipes`

**Protegida**: ❌ Não (pública)

**Parâmetros (Query)**:
- `sortBy` (string, opcional): Ordenação - `'most-upvotes'` | `'least-upvotes'` (default: `'most-upvotes'`)
- `pokemonIds` (string | string[], opcional): IDs de pokemons para filtrar (pode ser string separada por vírgula ou array)
- `seasoningItemIds` (string | string[], opcional): IDs de seasoning items para filtrar (pode ser string separada por vírgula ou array)

**Exemplo de Request**:
```
GET /recipes?sortBy=most-upvotes&pokemonIds=id1,id2&seasoningItemIds=id1,id2,id3
```

**Resposta**:
- **Status**: `200 OK`
- **Tipo**: `Recipe[]`

```typescript
[
  {
    _id: string;
    authorId: string;
    pokemonId: string;
    seasoningItemIds: string[];
    description: string | null;
    category: RecipeCategory[];
    upvoteCount: number;
    upvotedBy: string[];
    createdAt: Date;
    updatedAt: Date;
  }
]
```

**Notas**:
- Filtro `pokemonIds` usa `$in` (receitas com qualquer um dos pokemons fornecidos)
- Filtro `seasoningItemIds` usa `$all` (receitas que contêm TODOS os seasoning items fornecidos)
- Se nenhum filtro for fornecido, retorna todas as receitas ordenadas

---

### 3. GET /seasoning-items

**Descrição**: Listar todos os seasoning items

**Método**: `GET`

**Rota**: `/seasoning-items`

**Protegida**: ❌ Não (pública)

**Parâmetros**: Nenhum

**Exemplo de Request**:
```
GET /seasoning-items
```

**Resposta**:
- **Status**: `200 OK`
- **Tipo**: `SeasoningItem[]`

```typescript
[
  {
    _id: string;
    itemName: string;
    effects: ItemEffect[];
    image?: string;
  }
]
```

Onde `ItemEffect` é:
```typescript
{
  type: EffectType;
  category?: EffectCategory;
  value?: string | null;
}
```

---

## Rotas Protegidas

### 4. POST /users

**Descrição**: Criar usuário local

**Método**: `POST`

**Rota**: `/users`

**Protegida**: ✅ Sim (JWT Bearer Token)

**Headers**:
```
Authorization: Bearer <token>
```

**Body**:
```json
{
  "nickname": "string" // obrigatório, mínimo 1 caractere
}
```

**Exemplo de Request**:
```json
POST /users
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "nickname": "Trainer123"
}
```

**Resposta**:
- **Status**: `201 Created`
- **Tipo**: `User`

```typescript
{
  _id: string;
  identityId: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Notas**:
- O `identityId` é extraído automaticamente do token JWT (`sub`)
- Se o usuário já existir, retorna erro `409 Conflict`

---

### 5. POST /recipes

**Descrição**: Criar receita

**Método**: `POST`

**Rota**: `/recipes`

**Protegida**: ✅ Sim (JWT Bearer Token)

**Headers**:
```
Authorization: Bearer <token>
```

**Body**:
```json
{
  "pokemonId": "string", // obrigatório
  "seasoningItemIds": ["string", "string", "string"], // obrigatório, exatamente 3 itens
  "description": "string | null" // opcional
}
```

**Exemplo de Request**:
```json
POST /recipes
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "pokemonId": "pokemon123",
  "seasoningItemIds": ["item1", "item2", "item3"],
  "description": "Great recipe for catching Pikachu!"
}
```

**Resposta**:
- **Status**: `201 Created`
- **Tipo**: `Recipe`

```typescript
{
  _id: string;
  authorId: string;
  pokemonId: string;
  seasoningItemIds: string[];
  description: string | null;
  category: RecipeCategory[];
  upvoteCount: number;
  upvotedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Notas**:
- O `authorId` é extraído automaticamente do token JWT (`sub`)
- Deve conter exatamente 3 seasoning items
- `upvoteCount` inicia em 0
- `upvotedBy` inicia como array vazio

---

### 6. POST /recipes/upvote

**Descrição**: Toggle de upvote em receita (adiciona se não tiver, remove se já tiver)

**Método**: `POST`

**Rota**: `/recipes/upvote`

**Protegida**: ✅ Sim (JWT Bearer Token)

**Headers**:
```
Authorization: Bearer <token>
```

**Body**:
```json
{
  "recipeId": "string" // obrigatório
}
```

**Exemplo de Request**:
```json
POST /recipes/upvote
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "recipeId": "recipe123"
}
```

**Resposta**:
- **Status**: `200 OK`
- **Tipo**: `Recipe` (atualizada)

```typescript
{
  _id: string;
  authorId: string;
  pokemonId: string;
  seasoningItemIds: string[];
  description: string | null;
  category: RecipeCategory[];
  upvoteCount: number; // atualizado
  upvotedBy: string[]; // atualizado
  createdAt: Date;
  updatedAt: Date;
}
```

**Comportamento**:
- Se o usuário **não** tiver dado upvote: adiciona o upvote (incrementa `upvoteCount` e adiciona `userId` em `upvotedBy`)
- Se o usuário **já** tiver dado upvote: remove o upvote (decrementa `upvoteCount` e remove `userId` de `upvotedBy`)
- O `userId` é extraído automaticamente do token JWT (`sub`)

**Erros**:
- `404 Not Found`: Receita não encontrada
- `400 Bad Request`: Falha ao atualizar upvote

---

## Autenticação

Todas as rotas protegidas requerem autenticação via JWT Bearer Token.

### Header de Autenticação
```
Authorization: Bearer <token>
```

### Estrutura do Token JWT

O token JWT deve conter os seguintes campos no payload:

```typescript
{
  sub: string;        // ID do usuário (identityId)
  email: string;      // Email do usuário
  aud: string;        // Application ID (deve corresponder ao CLIENT_ID)
  iat?: number;       // Issued at (opcional)
  exp?: number;       // Expiration (opcional)
}
```

### Validações do Token

1. ✅ `sub` é obrigatório
2. ✅ `email` é obrigatório
3. ✅ `aud` é obrigatório
4. ✅ `aud` deve corresponder ao `CLIENT_ID` configurado no servidor

### Uso do Token nas Rotas

- O campo `sub` do token é usado como `identityId` na criação de usuário
- O campo `sub` do token é usado como `authorId` na criação de receita
- O campo `sub` do token é usado como `userId` no toggle de upvote

---

## Modelos de Dados

### Pokemon

```typescript
{
  _id: string;
  registrationNumber: string;
  name: string;
  bucket: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  types: PokemonType[];
  eggGroups: EggGroup[];
}
```

**Tipos**:
- `PokemonType`: 'bug' | 'dark' | 'dragon' | 'electric' | 'fairy' | 'fighting' | 'fire' | 'flying' | 'ghost' | 'grass' | 'ground' | 'ice' | 'normal' | 'poison' | 'psychic' | 'rock' | 'steel' | 'water'
- `EggGroup`: 'bug' | 'ditto' | 'dragon' | 'fairy' | 'flying' | 'ground' | 'humanshape' | 'indeterminate' | 'mineral' | 'monster' | 'no-eggs' | 'plant' | 'water1' | 'water2' | 'water3'

### User

```typescript
{
  _id: string;
  identityId: string;  // ID do Identity Service
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Recipe

```typescript
{
  _id: string;
  authorId: string;
  pokemonId: string;
  seasoningItemIds: string[];  // Sempre 3 itens
  description: string | null;
  category: RecipeCategory[];
  upvoteCount: number;
  upvotedBy: string[];  // Array de userIds que deram upvote
  createdAt: Date;
  updatedAt: Date;
}
```

**Tipos**:
- `RecipeCategory`: 'fishing' | 'pokesnack'

### SeasoningItem

```typescript
{
  _id: string;
  itemName: string;
  effects: ItemEffect[];
  image?: string;
}
```

**ItemEffect**:
```typescript
{
  type: EffectType;
  category?: EffectCategory;
  value?: string | null;
}
```

**Tipos**:
- `EffectType`: 'REDUCE_BITE_TIME_PERCENT' | 'BOOST_RARITY_BUCKET' | 'INCREASE_SHINY_CHANCE_MULTIPLIER' | 'ATTRACT_HIDDEN_ABILITY' | 'INCREASE_REEL_CHANCE' | 'BOOST_POKEMON_LEVEL' | 'ATTRACT_EV_YIELD' | 'BOOST_FRIENDSHIP' | 'ATTRACT_FEMALE_POKEMON' | 'ATTRACT_MALE_POKEMON' | 'DROPS_REROLL_COUNT' | 'BOOST_IVS' | 'EGG_GROUP_BOOST' | 'TYPE_BOOST' | 'ATTRACT_NATURE' | 'NO_EFFECT'
- `EffectCategory`: 'HP' | 'ATTACK' | 'DEFENSE' | 'SPECIAL_ATTACK' | 'SPECIAL_DEFENSE' | 'SPEED' | 'DRAGON' | 'MONSTER' | 'WATER_1' | 'WATER_2' | 'WATER_3' | 'BUG' | 'FAIRY' | 'GRASS' | 'HUMAN_LIKE' | 'FLYING' | 'FIELD' | 'MINERAL' | 'AMORPHOUS' | 'DARK' | 'ELECTRIC' | 'FIGHTING' | 'FIRE' | 'GHOST' | 'GROUND' | 'ICE' | 'NORMAL' | 'POISON' | 'PSYCHIC' | 'ROCK' | 'STEEL' | 'WATER'

---

## Resumo por Categoria

### Rotas Públicas (não protegidas):
- ✅ `GET /pokemons/search` - Buscar pokemons por nome
- ✅ `GET /recipes` - Buscar receitas com filtros
- ✅ `GET /seasoning-items` - Listar todos os seasoning items

### Rotas Protegidas (JWT Bearer Token):
- 🔒 `POST /users` - Criar usuário local
- 🔒 `POST /recipes` - Criar receita
- 🔒 `POST /recipes/upvote` - Toggle upvote em receita

---

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Erro na requisição (validação, etc.)
- `401 Unauthorized`: Token inválido ou ausente
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito (ex: usuário já existe)

---

## Exemplos de Uso

### Buscar Pokemons
```bash
curl -X GET "http://localhost:3000/pokemons/search?name=pikachu&limit=10"
```

### Criar Usuário
```bash
curl -X POST "http://localhost:3000/users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"nickname": "Trainer123"}'
```

### Criar Receita
```bash
curl -X POST "http://localhost:3000/recipes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pokemonId": "pokemon123",
    "seasoningItemIds": ["item1", "item2", "item3"],
    "description": "Great recipe!"
  }'
```

### Buscar Receitas com Filtros
```bash
curl -X GET "http://localhost:3000/recipes?sortBy=most-upvotes&pokemonIds=id1,id2&seasoningItemIds=id1,id2,id3"
```

### Toggle Upvote
```bash
curl -X POST "http://localhost:3000/recipes/upvote" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"recipeId": "recipe123"}'
```

### Listar Seasoning Items
```bash
curl -X GET "http://localhost:3000/seasoning-items"
```


