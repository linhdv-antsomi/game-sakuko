// Libraries
import React, { Suspense } from "react";
import "zmp-ui/zaui.css";

// Components
const MerryChristmas = React.lazy(() =>
  import("./MerryChristmas").then((module) => ({
    default: module.MerryChristmas,
  }))
);

export default function MerryChristmasPage() {
  return (
    <Suspense>
      <MerryChristmas />
    </Suspense>
  );
}
