import { SearchPokemonsUseCase } from './pokemons/search-pokemons/search-pokemons.usecase';
import { CreateUserUseCase } from './users/create-user/create-user.usecase';
import { GetNicknameUseCase } from './users/get-nickname/get-nickname.usecase';
import { CreateRecipeUseCase } from './recipes/create-recipe/create-recipe.usecase';
import { ToggleUpvoteUseCase } from './recipes/toggle-upvote/toggle-upvote.usecase';
import { ListAllSeasoningItemsUseCase } from './seasoning-items/list-all/list-all-seasoning-items.usecase';
import { SearchRecipesUseCase } from './recipes/search-recipes/search-recipes.usecase';

export default [
  SearchPokemonsUseCase,
  CreateUserUseCase,
  GetNicknameUseCase,
  CreateRecipeUseCase,
  ToggleUpvoteUseCase,
  ListAllSeasoningItemsUseCase,
  SearchRecipesUseCase,
];
