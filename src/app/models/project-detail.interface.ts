export interface ProjectDetailModel {
    id: string;

    title: string;

    description: string;

    createdAt: string;

    todos: Array<any>;

    statuses: Array<any>;
}