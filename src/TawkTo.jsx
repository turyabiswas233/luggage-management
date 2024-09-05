import React, { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

function TawkTo() {
  const tawkMessengerRef = useRef(null);

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };

  const onLoad = () => {
    console.log("tawk.to is loaded");
  };

  return (
    <div className="relative">
      <TawkMessengerReact
        ref={tawkMessengerRef}
        propertyId="66d6f97650c10f7a00a3730d"
        widgetId="1i6rrstvk"
        onLoad={onLoad}
      /> 
    </div>
  );
}

export default TawkTo;
