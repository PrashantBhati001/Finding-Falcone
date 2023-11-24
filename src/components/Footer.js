import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box className="footer">
      <div className="Icons">
          <FacebookIcon  className="iconStyle"/>
          <InstagramIcon  className="iconStyle"/>
          <TwitterIcon  className="iconStyle"/>
          <LinkedInIcon className="iconStyle"/>
      </div>

    </Box>
  );
};


export default Footer;




