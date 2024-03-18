import type {Character} from "~/models/character.starpi";

export interface Nation {
    id: number
    name: string
    character: Array<Character>
    published_at: Date;
    created_at: Date;
    updated_at: Date;
}
