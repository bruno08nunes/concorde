import { Friendship, FriendshipRequest, FriendshipRequestStatus } from "../../generated/prisma/browser";

export interface IFriendshipRepository {
    getRequestById(id: number): Promise<FriendshipRequest | null>;
    getRequestBySenderIdAndReceiverId(senderId: number, receiverId: number): Promise<FriendshipRequest | null>;
    createRequest(senderId: number, receiverId: number): Promise<FriendshipRequest>;
    changeRequestStatus(requestId: number, newStatus: FriendshipRequestStatus): Promise<FriendshipRequest>;
    getFriendship(friend1Id: number, friend2Id: number): Promise<Friendship | null>;
    createFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
    excludeFriendship(friend1Id: number, friend2Id: number): Promise<Friendship>;
}