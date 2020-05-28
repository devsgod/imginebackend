import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  Person as UserIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Users",
    link: "/app/users",
    icon: <UserIcon />,
    children: [
      { label: "All Users", link: "/app/users" },
      { label: "Contact Enquiries", link: "/app/users/contact" },
      // { label: "Test Drive", link: "/app/users/testdrive" },
    ]
  },
  {
    id: 2,
    label: "Products",
    link: "/app/products",
    icon: <UIElementsIcon />,
    children: [
      { label: "All Products", link: "/app/products/list" },
    ]
  },
  {
    id: 3,
    label: "Categories",
    link: "/app/category",
    icon: <UIElementsIcon />,
    children: [
      { label: "All Categories", link: "/app/category/list" },
    ]
  },
  {
    id: 4,
    label: "Orders",
    link: "/app/orders",
    icon: <LibraryIcon />,
    children: [
      { label: "All Orders", link: "/app/orders/list" },
    ]
  },
  {
    id: 5,
    label: "Blogs",
    link: "/app/blogs",
    icon: <LibraryIcon />,
    children: [
      { label: "All Blogs", link: "/app/blogs/list" },
      { label: "Add Blog", link: "/app/blogs/add" },
    ]
  },
  {
    id: 6,
    label: "Clients",
    link: "/app/clients",
    icon: <TypographyIcon />,
    children: [
      { label: "All Clients", link: "/app/clients/list" },
      { label: "Add Client", link: "/app/clients/add" },
    ]
  },
  {
    id: 7,
    label: "Testimonials",
    link: "/app/testimonials",
    icon: <SupportIcon />,
    children: [
      { label: "All Testimonials", link: "/app/testimonials/list" },
      { label: "Add Testimonial", link: "/app/testimonials/add" },
    ]
  },
  {
    id: 8,
    label: "Widgets",
    link: "/app/widgets",
    icon: <TableIcon />,
    children: [
      { label: "All Widgets", link: "/app/widgets/list" },
      { label: "Add Widget", link: "/app/widgets/add" },
    ]
  },
  {
    id: 9,
    label: "Features",
    link: "/app/features",
    icon: <TableIcon />,
    children: [
      { label: "All Features", link: "/app/features/list" },
      { label: "Add Feature", link: "/app/features/add" },
    ]
  },

  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="large" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="large" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="large" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var myOpinion = window.location.herf
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
