// "use client";
// import axios from "axios";
// import React, { useState } from "react";
// import mapBoxclient from "../configs/mapBoxclient";
// import { SearchIcon } from "@chakra-ui/icons";
// import {
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
// } from "@chakra-ui/react";

// interface Suggestion {
//   name: string;
//   mapbox_id: "string";
//   place_formatted: string;
// }

// const MapSearchComponent = () => {
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

//   const handleChange = (input: string) => {
//     setValue(input);
//     if (input === "") {
//       setSuggestions([]);
//       return;
//     }
//     mapBoxclient.get(`/suggest?q=${input}`).then((res) => {
//       console.log(res.data.suggestions);
//       setSuggestions(res.data.suggestions);
      
//     });
//   };

//   const handleClickResult = (mapbox_id: string) => {
//     mapBoxclient.get(`/retrieve?q=${mapbox_id}`).then((res) => {
//       console.log(res.data);
//       setSuggestions(res.data);
      
//     });
//   }

//   return (
//     <div>
//       <div className="flex w-[240px]">
//         <InputGroup>
//           <InputLeftElement>
//             <SearchIcon color={"blue.500"} />
//           </InputLeftElement>
//           <Input
//             type="search"
//             value={value}
//             placeholder="search"
//             onChange={(e) => handleChange(e.currentTarget.value)}
//           />
//         </InputGroup>
//       </div>

//       <ul
//         className="max-w-[240px] text-[15px] 
//          absolute left-0 z-1000 list-none top-[calc(100% + 6px)]
//          overflow-hidden rounded-md shadow-md mt-2"
//       >
//         {suggestions.map((suggestion) => (
//           <li
//             className=" w-[100%] min-h-[53px] border-b-[1px]  px-4
//                          min-w-[240px] text-[15px] z-1000 hover:bg-base-300 "
//             key={suggestion.mapbox_id}
//             onClick={()=> handleClickResult(suggestion.mapbox_id)}
//           >
//             <div className="flex">
//               <div className=" my-auto mt-2">
//                 <div className="text-md font-bold ">{suggestion.name}</div>
//                 <div className="text-sm">{suggestion.place_formatted}</div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MapSearchComponent;
