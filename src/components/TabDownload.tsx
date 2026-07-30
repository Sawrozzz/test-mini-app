export function DownloadTab() {
  const downloads = [
    {
      name: "Sample Image",
      type: "Image",
      url: "https://picsum.photos/1200/800",
      fileName: "sample-image.jpg",
    },
    {
      name: "Sample PDF",
      type: "PDF",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileName: "sample.pdf",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Downloads</h2>

      {downloads.map((file) => (
        <div
          key={file.name}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{file.type}</p>
          </div>

          <a
            href={file.url}
            download={file.fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}