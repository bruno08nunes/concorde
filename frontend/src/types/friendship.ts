export interface Friendship {
    friendshipId: number;
    createdAt: Date;
    endedAt: Date | null;
    friend: {
        id: number;
        username: string;
        email: string;
        profilePictureId: number | null;
        profilePictureUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
}
