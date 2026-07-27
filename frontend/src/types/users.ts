export interface IUserItem {
    id: number;
    username: string;
    profilePictureId: number | null;
    profilePictureUrl: string | null;
}

export interface User {
    id: number;
    username: string;
    profilePictureId: number | null;
    profilePicture: {
        url: string
    } | null;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date;
    isFriend: boolean;
}