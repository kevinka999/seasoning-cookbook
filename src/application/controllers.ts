import { SearchPokemonsController } from './pokemons/search-pokemons/search-pokemons.controller';
import { CreateUserController } from './users/create-user/create-user.controller';
import { CreateRecipeController } from './recipes/create-recipe/create-recipe.controller';
import { ToggleUpvoteController } from './recipes/toggle-upvote/toggle-upvote.controller';
import { ListAllSeasoningItemsController } from './seasoning-items/list-all/list-all-seasoning-items.controller';

export default [
  SearchPokemonsController,
  CreateUserController,
  CreateRecipeController,
  ToggleUpvoteController,
  ListAllSeasoningItemsController,
];
