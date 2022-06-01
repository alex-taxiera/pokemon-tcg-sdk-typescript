export interface Response<T> {
    data: T;
    page: number
    pageSize: number
    count: number
    totalCount: number
}
