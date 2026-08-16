import { Plus } from "lucide-react";
import IconLabel from "../IconLabel";

export default function FileInput({
    setFiles,
}: {
    setFiles: (files: File[]) => void;
}) {
    return (
        <IconLabel inputId="files">
            <input
                type="file"
                name="files"
                id="files"
                multiple
                className="hidden"
                onChange={(e) => {
                    const newFiles = e.currentTarget.files
                        ? Array.from(e.currentTarget.files).filter(
                              (file) =>
                                  file.type !== "application/octet-stream",
                          )
                        : null;

                    if (!newFiles || newFiles.length === 0) {
                        setFiles([]);
                        return;
                    }

                    setFiles(newFiles);
                }}
            />
            <Plus />
        </IconLabel>
    );
}
