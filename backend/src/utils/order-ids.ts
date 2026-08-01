export default function orderIds(id1: number, id2: number) {
    const firstId = Math.min(id1, id2);
    const secondId = Math.max(id1, id2);

    return [firstId, secondId];
}
