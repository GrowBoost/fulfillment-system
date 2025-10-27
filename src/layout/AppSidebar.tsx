"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  GroupIcon,
} from "@/icons";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Übersicht", // Renamed from Dashboard/E-Commerce
    path: "/", // Now a top-level item
  },
  {
    icon: <CalenderIcon />,
    name: "Kalender",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "Benutzerprofil",
    path: "/profile",
  },
  {
    icon: <GroupIcon />,
    name: "Geschäftsführung",
    subItems: [
      { name: "Aufgaben", path: "/geschaeftsfuehrung/aufgaben", pro: false },
      { name: "Finanzen", path: "/geschaeftsfuehrung/Finanzen", pro: false },
      { name: "KPI's", path: "/geschaeftsfuehrung/kpis", pro: false },
      { name: "Kundenstammdaten", path: "/geschaeftsfuehrung/kundenstammdaten", pro: false },
    ],
  },
  {
    icon: <GroupIcon />,
    name: "Buchhaltung",
    subItems: [
      { name: "Rechnungen", path: "/backoffice/rechnungen", pro: false },
      { name: "Mahnwesen", path: "/backoffice/mahnwesen", pro: false },
      { name: "Kündigungen", path: "/backoffice/kuendigungen", pro: false },
    ],
  },
  {
    icon: <GroupIcon />,
    name: "Kunden",
    subItems: [
      { name: "Onboarding", path: "/kunden/onboarding", pro: false },
      { name: "Projekte", path: "/kunden/projekte", pro: false },
      { name: "Offboarding", path: "/kunden/offboarding", pro: false },
      { name: "Empfehlungen & Bewertungen", path: "/kunden/empfehlungen-bewertungen", pro: false },
      { name: "Kontakt-Historie", path: "/kunden/kontakt-historie", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Marketing",
    subItems: [
      { name: "Social Media", path: "/marketing/social-media", pro: false },
      { name: "E-Mail-Marketing", path: "/marketing/e-mail-marketing", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />, // Using PlugInIcon as a placeholder, can be changed later
    name: "Agenten & Automationen",
    path: "/agenten/agenten",
  },
  {
    icon: <PlugInIcon />, // Placeholder icon for "Einstellungen"
    name: "Einstellungen",
    subItems: [
      { name: "Benutzer & Rollen", path: "/einstellungen/benutzer-rollen", pro: false },
      { name: "Datenquellen & Schnittstellen", path: "/einstellungen/datenquellen-schnittstellen", pro: false },
      { name: "Benachrichtigungen", path: "/einstellungen/benachrichtigungen", pro: false },
    ],
  },
];

const uiElementsItems: NavItem[] = [
  {
    name: "Formulare",
    icon: <ListIcon />,
    subItems: [{ name: "Formularelemente", path: "/form-elements", pro: false }],
  },
  {
    name: "Tabellen",
    icon: <TableIcon />,
    subItems: [{ name: "Basistabellen", path: "/basic-tables", pro: false }],
  },
  {
    name: "Seiten",
    icon: <PageIcon />,
    subItems: [
      { name: "Leere Seite", path: "/blank", pro: false },
      { name: "404 Fehler", path: "/error-404", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Diagramme",
    subItems: [
      { name: "Liniendiagramm", path: "/line-chart", pro: false },
      { name: "Balkendiagramm", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI-Elemente",
    subItems: [
      { name: "Benachrichtigungen", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Abzeichen", path: "/badge", pro: false },
      { name: "Schaltflächen", path: "/buttons", pro: false },
      { name: "Bilder", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentifizierung",
    subItems: [
      { name: "Anmelden", path: "/signin", pro: false },
      { name: "Registrieren", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, showUserProfileLink } = useSidebar();
  const pathname = usePathname();
  const [isOrganizationDropdownOpen, setIsOrganizationDropdownOpen] = useState(false);
  const organizationDropdownRef = useRef<HTMLDivElement>(null);

  const toggleOrganizationDropdown = () => {
    setIsOrganizationDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (organizationDropdownRef.current && !organizationDropdownRef.current.contains(event.target as Node)) {
        setIsOrganizationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "ui" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => {
        // Conditionally render "Benutzerprofil" link
        if (nav.name === "Benutzerprofil" && !showUserProfileLink) {
          return null; // Do not render the link
        }

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={` ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className={`menu-item-text`}>{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                            >
                              neu
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                            >
                              Pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "ui" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "ui", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "ui"
          ? uiElementsItems
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "ui" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "ui" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <div className="relative w-full" ref={organizationDropdownRef}>
          <button
            onClick={toggleOrganizationDropdown}
            className={`flex items-center gap-2 w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 ${
              !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                <Image
                  className="dark:hidden"
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  width={60}
                  height={12}
                />
                <Image
                  className="hidden dark:block"
                  src="/images/logo/logo-dark.svg"
                  alt="Logo"
                  width={60}
                  height={12}
                />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">GrowBoost</span>
              </>
            ) : (
              <Image
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={16}
                height={16}
              />
            )}
          </button>

          <div
            ref={organizationDropdownRef}
            className={`absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 z-50 ${
              isOrganizationDropdownOpen && (isExpanded || isHovered || isMobileOpen)
                ? "max-h-40 opacity-100 visible" // Adjust max-h as needed for content
                : "max-h-0 opacity-0 invisible"
            }`}
          >
            <ul className="py-1">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                  GrowBoost
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                  Organisation 2 (Dummy)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menü"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "UI"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(uiElementsItems, "ui")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Sonstiges"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
