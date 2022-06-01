import { Parameter } from '../interfaces/parameter';
import { Set } from '../interfaces/set';
import { Client } from '../client';
import { Response } from '../interfaces/response';

export async function findSetByID(id: string): Promise<Set> {
    const client: Client = Client.getInstance();
    const response = await client.get<Set>(`sets/${id}`);
    return response.data;
}

export async function findSetsByQueries(params: Parameter): Promise<Response<Set[]>> {
    const client: Client = Client.getInstance();
    const response = await client.get<Set[]>('sets', params);
    return response;
}

export async function getAllSets(): Promise<Set[]> {
    const params: Parameter = { pageSize: 250 };

    const client: Client = Client.getInstance();
    const response = await client.get<Set[]>('sets', params);
    return response.data;
}
