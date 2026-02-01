// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function TestAPI() {

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://192.168.100.14:8000/api/data")
//       .then(res => {
//         console.log("API RESPONSE:", res.data);
//         setData(res.data.data);
//       })
//       .catch(err => {
//         console.error("API ERROR:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Data from FastAPI:</h1>
//       <ul>
//         {data.map((d, i) => <li key={i}>{d}</li>)}
//       </ul>
//     </div>
//   );
// }

// export default TestAPI;