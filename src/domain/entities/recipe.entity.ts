export enum RecipeCategory {
  FISHING = 'fishing',
  POKESNACK = 'pokesnack',
}

export interface RecipeData {
  id: string;
  authorId: string;
  pokemonId: string;
  seasoningItemIds: string[];
  description?: string | null;
  category?: RecipeCategory[];
  upvoteCount?: number;
  upvotedBy?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Recipe {
  public readonly id: string;
  public readonly authorId: string;
  public readonly pokemonId: string;
  public readonly seasoningItemIds: string[];
  public readonly description: string | null;
  public readonly category: RecipeCategory[];
  public readonly upvoteCount: number;
  public readonly upvotedBy: string[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: RecipeData) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.pokemonId = data.pokemonId;
    this.seasoningItemIds = data.seasoningItemIds;
    this.description = data.description ?? null;
    this.category = data.category ?? [];
    this.upvoteCount = data.upvoteCount ?? 0;
    this.upvotedBy = data.upvotedBy ?? [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
