import { SearchPokemonsUseCase } from './pokemons/search-pokemons/search-pokemons.usecase';
import { CreateUserUseCase } from './users/create-user/create-user.usecase';
import { CreateRecipeUseCase } from './recipes/create-recipe/create-recipe.usecase';
import { ToggleUpvoteUseCase } from './recipes/toggle-upvote/toggle-upvote.usecase';

export default [
  SearchPokemonsUseCase,
  CreateUserUseCase,
  CreateRecipeUseCase,
  ToggleUpvoteUseCase,
];
