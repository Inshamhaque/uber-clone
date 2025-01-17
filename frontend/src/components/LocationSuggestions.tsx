export function LocationSuggestions({
  suggestions,
  setpanel,
  setvehicelpanelopen,
}: any) {
  return (
    <div>
      {suggestions?.result?.length > 0 ? (
        suggestions.result.map((el: any, idx: number) => (
          <div
            key={idx}
            onClick={() => {
              setpanel(false);
              setvehicelpanelopen(true);
            }}
            className="flex flex-col mb-3 p-2 border rounded-lg bg-[#eee]"
          >
            {el.description}
          </div>
        ))
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
}
