import React, { useState } from "react";
// import Tooltip from "./Badge1";

//  export default function Check() {
//   return (
//     <Tooltip>
//       <button>Hello</button>
//     </Tooltip>
//   )
//  }
import ToastWarning from "./Badge1";

export default function Check() {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Save</button>

      {showToast && <ToastWarning onClose={() => setShowToast(false)} />}
    </div>
  );
}
