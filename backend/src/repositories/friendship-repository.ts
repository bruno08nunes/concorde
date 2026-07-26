import {
    Friendship,
    FriendshipRequest,
    FriendshipRequestStatus,
    User,
} from "../../generated/prisma/browser";

export interface IFriendshipRepository {
    getRequestById(id: number): Promise<FriendshipRequest | null>;
    getLatestRequestByUsers(
        senderId: number,
        receiverId: number,
    ): Promise<FriendshipRequest | null>;
    createRequest(
        senderId: number,
        receiverId: number,
    ): Promise<FriendshipRequest>;
    changeRequestStatus(
        requestId: number,
        newStatus: FriendshipRequestStatus,
    ): Promise<FriendshipRequest>;
    getActiveFriendship(
        friend1Id: number,
        friend2Id: number,
    ): Promise<Friendship | null>;
    getFriends(
        userId: number,
    ): Promise<
        {
            friendshipId: number;
            createdAt: Date;
            endedAt: Date | null;
            friend: Partial<User>;
        }[]
    >;
    createFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
    endFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
    acceptRequestAndCreateFriendship(friendshipRequest: {
        id: number;
        senderId: number;
        receiverId: number;
    }): Promise<Friendship>;
}
