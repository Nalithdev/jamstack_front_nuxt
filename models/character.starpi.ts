import type {Image, Meta} from "~/models/strapi.model";

export interface Character{
    id: number;
    name: string;
    age: bigint;
    slug: string;
    race: string;
    image: Image;
    nation: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    __v: number;
}

export interface CharacterResponse {
    data : Character

}

export interface CharactersResponse {
    data : Character[]
    meta : Meta
}

export interface BackCharactersResponse {
    data : Character[]
    meta : Meta
}

