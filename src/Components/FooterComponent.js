import React from "react";
import { TbBrandGithub } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { FiLinkedin } from "react-icons/fi";
const FooterComponent = () => {
  return (
    <>
      <footer className="flex flex-col items-center justify-center mt-5 mb-6 ">
        <div className=" flex items-center ] mt-12 space-x-6  mb-3 ">
          <a href='https://github.com/rpranay14' target="_blank"><TbBrandGithub className="w-5 h-5  cursor-pointer hover:text-[#64ffda]" /></a>

          <a href='https://linkedin.com/in/pranayrawat14' target="_blank"><FiLinkedin className="w-5 h-5  cursor-pointer  hover:text-[#64ffda]" /></a>
        </div>
        <p className="font-mono  text-sm mb-1 mt-1 ">
          Email: <span className="font-semibold">rpranay14@gmail.com</span>
        </p>
        <p className="font-mono  text-sm ">
          Built by Pranay Rawat
        </p>
      </footer >
    </>
  );
};

export default FooterComponent;
