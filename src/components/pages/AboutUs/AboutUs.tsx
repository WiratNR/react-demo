import { Paper } from "@mui/material";
import * as React from "react";
import Iframe from "react-iframe";

type AboutUsProps = {
  //
};

const AboutUs: React.FC<any> = () => {
  return (
    <Paper sx={{ height: "86vh" }}>
      {/* <Iframe url="https://codemobiles.com" width="100%" height="100%" id="myId" display="inline" position="relative" /> */}
      <Iframe url="https://script.google.com/a/macros/psru.ac.th/s/AKfycbwklcpeG40HZ9W_GE-2nyv0OqU-ehlOk61yL6PX0sTA45twjbREprMvg6wNiE8yyQ/exec" width="100%" height="100%" id="myId" display="inline" position="relative" />
    </Paper>
  );
};

export default AboutUs;