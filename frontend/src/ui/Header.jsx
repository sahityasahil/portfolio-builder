import React from "react"; // Explicitly import React
import { FloatingDock } from "./floating-dock";
import { ImFont } from "react-icons/im";

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Header() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-black dark:text-neutral-300" />
      ),
      href: "../",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-black dark:text-neutral-300" />
      ),
      href: "#",
    },
    // {
    //   title: "Components",
    //   icon: (
    //     <IconNewSection className="h-full w-full text-black dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
    {
      title: "PortFolio",
      icon: (
        <ImFont  className="h-full w-full text-black dark:text-neutral-300"/>
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-black dark:text-neutral-300" />
      ),
      href: "https://github.com/sahityasahil",
    },
  ];

  return (
    <div className="sticky top-7 z-50 flex items-center justify-center h-12 w-full bg-black  shadow-md">
      <FloatingDock items={links} />
    </div>
  );
}
