import { useState, useCallback } from "react";

export function Printer({ jsonOutput }: { jsonOutput: string }) {
  const [copyButtonText, setCopyButtonText] = useState("Copy to Clipboard");

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy to Clipboard"), 2000);
    });
  }, [jsonOutput]);

  const parsedOutput = JSON.parse(jsonOutput);

  const renderContent = () => {
    if (parsedOutput.git_custom_nodes) {
      return (
        <div className="flex flex-col gap-4">
          {Object.entries(parsedOutput.git_custom_nodes).map(
            ([url, data]: [string, any]) => (
              <div key={url} className="bg-white shadow-md rounded-lg p-4">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <p className="font-semibold text-lg mb-2 truncate">
                    {url.replace("https://github.com/", "")}
                  </p>
                </a>
                <p className="text-sm text-gray-600">Hash: {data.hash}</p>
              </div>
            )
          )}
        </div>
      );
    } else if (Array.isArray(parsedOutput) && parsedOutput[0]?.name) {
      return (
        <div className="flex flex-col gap-4">
          {parsedOutput.map((model: any, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <p className="font-semibold text-lg">{model.name}</p>
              {/* print url of model */}
              <a href={model.url} target="_blank" rel="noopener noreferrer">
                {model.url}
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="bg-white shadow-md rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(parsedOutput, null, 2)}
          </pre>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <br />
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {copyButtonText}
      </button>
      {renderContent()}
    </div>
  );
}
