import { SearchPokemonsUseCase } from './pokemons/search-pokemons/search-pokemons.usecase';
import { CreateUserUseCase } from './users/create-user/create-user.usecase';
import { CreateRecipeUseCase } from './recipes/create-recipe/create-recipe.usecase';
import { ToggleUpvoteUseCase } from './recipes/toggle-upvote/toggle-upvote.usecase';
import { ListAllSeasoningItemsUseCase } from './seasoning-items/list-all/list-all-seasoning-items.usecase';

export default [
  SearchPokemonsUseCase,
  CreateUserUseCase,
  CreateRecipeUseCase,
  ToggleUpvoteUseCase,
  ListAllSeasoningItemsUseCase,
];
