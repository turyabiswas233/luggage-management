import React, { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

function TawkTo() {
  const tawkMessengerRef = useRef(null);

  return (
    <div className="relative">
      <TawkMessengerReact
        ref={tawkMessengerRef}
        propertyId="66d6f97650c10f7a00a3730d"
        widgetId="1i6rrstvk"
      />
    </div>
  );
}

export default TawkTo;
