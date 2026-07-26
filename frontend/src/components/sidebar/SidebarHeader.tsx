import SearchInput from "../form/SearchInput";
import ToggleButton from "../form/ToggleButton";

interface SidebarHeaderProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setIsFriendListActive: React.Dispatch<React.SetStateAction<boolean>>;
    isFriendListActive: boolean;
}

export default function SidebarHeader({
    setSearch,
    setIsFriendListActive,
    isFriendListActive,
}: SidebarHeaderProps) {
    return (
        <header className="flex gap-2">
            <SearchInput onChange={(e) => setSearch(e.target.value)} />
            <ToggleButton condition={isFriendListActive} onClick={() => setIsFriendListActive(true)} text="Amigos" />
            <ToggleButton condition={!isFriendListActive} onClick={() => setIsFriendListActive(false)} text="Usuários" />
        </header>
    );
}
