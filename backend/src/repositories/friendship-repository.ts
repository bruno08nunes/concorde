import {
    Friendship,
    FriendshipRequest,
    FriendshipRequestStatus,
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
    createFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
    endFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
    acceptRequestAndCreateFriendship(friendshipRequest: {
        id: number;
        senderId: number;
        receiverId: number;
    }): Promise<Friendship>;
}
