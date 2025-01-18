export function LocationSuggestions({
  suggestions,
  setpickup,
  setdestination,
  inputchosen,
}: any) {
  return (
    <div>
      {suggestions?.result?.length > 0 ? (
        suggestions.result.map((el: any, idx: number) => (
          <div
            key={idx}
            onClick={() => {
              inputchosen == "pickup"
                ? setpickup(el.description)
                : setdestination(el.description);
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
