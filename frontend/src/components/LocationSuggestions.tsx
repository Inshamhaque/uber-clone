export function LocationSuggestions({setpanel, setvehicelpanelopen} :any){
    const locations = [
        "C-1805, BPTP Princess Park, Sector 86 Faridabad, Haryana",
        "C3-1302, SRS Residency, Sector 88 Faridabad, Haryana"
    ]
    return(
        <div>
            {locations.map((el,idx)=>{
                return(
                    <div 
                    onClick={()=>{
                        setpanel(false);
                        // setpanelclose(true);
                        setvehicelpanelopen(true);
                        
                    }}
                    className="flex flex-col mb-3 p-2 border rounded-lg bg-[#eee] ">
                        {el}
                    </div>
                )
            })}
        </div>
    )
}