export type EffectType =
  | 'REDUCE_BITE_TIME_PERCENT'
  | 'BOOST_RARITY_BUCKET'
  | 'INCREASE_SHINY_CHANCE_MULTIPLIER'
  | 'ATTRACT_HIDDEN_ABILITY'
  | 'INCREASE_REEL_CHANCE'
  | 'BOOST_POKEMON_LEVEL'
  | 'ATTRACT_EV_YIELD'
  | 'BOOST_FRIENDSHIP'
  | 'ATTRACT_FEMALE_POKEMON'
  | 'ATTRACT_MALE_POKEMON'
  | 'DROPS_REROLL_COUNT'
  | 'BOOST_IVS'
  | 'EGG_GROUP_BOOST'
  | 'TYPE_BOOST'
  | 'ATTRACT_NATURE'
  | 'NO_EFFECT';

export type EffectCategory =
  | 'HP'
  | 'ATTACK'
  | 'DEFENSE'
  | 'SPECIAL_ATTACK'
  | 'SPECIAL_DEFENSE'
  | 'SPEED'
  | 'DRAGON'
  | 'MONSTER'
  | 'WATER_1'
  | 'WATER_2'
  | 'WATER_3'
  | 'BUG'
  | 'FAIRY'
  | 'GRASS'
  | 'HUMAN_LIKE'
  | 'FLYING'
  | 'FIELD'
  | 'MINERAL'
  | 'AMORPHOUS'
  | 'DARK'
  | 'ELECTRIC'
  | 'FIGHTING'
  | 'FIRE'
  | 'GHOST'
  | 'GROUND'
  | 'ICE'
  | 'NORMAL'
  | 'POISON'
  | 'PSYCHIC'
  | 'ROCK'
  | 'STEEL'
  | 'WATER';

export interface ItemEffect {
  type: EffectType;
  category?: EffectCategory;
  value?: string | null;
}

export interface GameItem {
  _id?: string;
  item_name: string;
  effects: ItemEffect[];
  image?: string;
}

export class SeasoningItem {
  public readonly _id: string;
  public readonly itemName: string;
  public readonly effects: ItemEffect[];
  public readonly image?: string;

  constructor(data: GameItem) {
    this._id = data._id || '';
    this.itemName = data.item_name;
    this.effects = data.effects;
    this.image = data.image;
  }
}
