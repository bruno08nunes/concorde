import { useParams } from "react-router-dom";

export default function UserInfo() {
    const { username } = useParams();

    return (
        <div>
            <div>{username}</div>
        </div>
    )
}