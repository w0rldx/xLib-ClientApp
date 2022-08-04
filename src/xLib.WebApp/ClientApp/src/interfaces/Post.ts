export interface IPost {
    id: string;
    message: string;
    createdDate: string;
}

export interface ICreateNewPost {
    message: string;
}

export interface UpdatePost {
    id: string;
    message: string;
}
