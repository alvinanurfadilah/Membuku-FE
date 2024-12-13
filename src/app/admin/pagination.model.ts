export interface Pagination<T> {
    data: T
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}