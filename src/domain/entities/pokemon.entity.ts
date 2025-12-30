export type PokemonBucket = 'common' | 'uncommon' | 'rare' | 'ultra-rare';

export type PokemonType =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export type EggGroup =
  | 'bug'
  | 'ditto'
  | 'dragon'
  | 'fairy'
  | 'flying'
  | 'ground'
  | 'humanshape'
  | 'indeterminate'
  | 'mineral'
  | 'monster'
  | 'no-eggs'
  | 'plant'
  | 'water1'
  | 'water2'
  | 'water3';

export type PokemonRegistryItem = {
  id: string;
  registrationNumber: string;
  name: string;
  bucket: PokemonBucket;
  types: PokemonType[];
  eggGroups: EggGroup[];
};

export class Pokemon {
  public readonly id: string;
  public readonly registrationNumber: string;
  public readonly name: string;
  public readonly bucket: PokemonBucket;
  public readonly types: PokemonType[];
  public readonly eggGroups: EggGroup[];

  constructor(data: PokemonRegistryItem) {
    this.id = data.id;
    this.registrationNumber = data.registrationNumber;
    this.name = data.name;
    this.bucket = data.bucket;
    this.types = data.types;
    this.eggGroups = data.eggGroups;
  }
}
