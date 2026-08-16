export default function FilesPlaceholder({ files }: { files: File[] }) {
    function getFileSymbol(fileType: string) {
        if (fileType.startsWith("image")) {
            return "🖼️";
        }

        if (fileType.startsWith("video")) {
            return "📽️";
        }

        if (fileType.startsWith("audio")) {
            return "🎙️";
        }

        if (fileType.endsWith("pdf")) {
            return "📄";
        }

        return "";
    }

    return (
        files.length > 0 && (
            <>
                <div className="flex gap-3 justify-center flex-wrap px-10">
                    {files.map((file) => (
                        <span key={file.lastModified}>
                            | {getFileSymbol(file.type)}
                            {file.name} |
                        </span>
                    ))}
                </div>
                <hr />
            </>
        )
    );
}
