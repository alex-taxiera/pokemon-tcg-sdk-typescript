import { Parameter } from '../interfaces/parameter';
import { Card } from '../interfaces/card';
import { Type } from '../enums/type';
import { Supertype } from '../enums/supertype';
import { Subtype } from '../enums/subtype';
import { Rarity } from '../enums/rarity';
import { Client } from '../client';
import { Response } from '../interfaces/response';

async function paginateAllCards(pageNumber: number, params?: Parameter): Promise<Card[]> {
    let currentPage = pageNumber;
    const client: Client = Client.getInstance();
    const response = await client.get<Card[]>('cards', { pageSize: 250, page: currentPage++, ...params });
    const cards = response.data;

    if (response.totalCount <= cards.length) {
        return cards;
    } else {
        return cards.concat(await paginateAllCards(currentPage));
    }
}

export async function getAllCards(params?: Parameter): Promise<Card[]> {
    const startingPage = 1;
    const response = await paginateAllCards(startingPage, params);
    return response;
}

export async function findCardByID(id: string, params?: Pick<Parameter, 'select'>): Promise<Response<Card>>{
    const client: Client = Client.getInstance();
    return await client.get<Card>(`cards/${id}`, params);
}

export async function findCardsByQueries(params: Parameter): Promise<Response<Card[]>> {
    const client: Client = Client.getInstance();
    return await client.get<Card[]>('cards', params);
}

export async function getTypes(): Promise<Response<Type[]>> {
    const client: Client = Client.getInstance();

    return await client.get<Type[]>('types');
}

export async function getSupertypes(): Promise<Response<Supertype[]>> {
    const client: Client = Client.getInstance();

    return await client.get<Supertype[]>('supertypes');
}

export async function getSubtypes(): Promise<Response<Subtype[]>> {
    const client: Client = Client.getInstance();

    return await client.get<Subtype[]>('subtypes');
}

export async function getRarities(): Promise<Response<Rarity[]>> {
    const client: Client = Client.getInstance();

    return await client.get<Rarity[]>('rarities');
}
