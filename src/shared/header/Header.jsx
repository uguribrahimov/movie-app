import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Input,
} from "reactstrap";
import { useState } from "react";

const Header = ({ logo }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    navigate(
      `${location.pathname === "/" ? "" : "now-playing"}/?search=${query}`
    );
  };

  // NavLink arrayı
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/now-playing", label: "Now Playing" },
  ];

  return (
    <Navbar
      color="dark"
      dark
      expand="md"
      className="py-3 w-100"
      style={{
        borderRadius: "0 0 20px 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center ">
        {/* Logo solda */}
        <NavbarBrand onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src={logo} alt="logo" style={{ height: "50px" }} />
        </NavbarBrand>

        {/* Ortada axtarış inputu */}
        <div className="mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
          <Input
            type="text"
            placeholder="Search movie"
            value={search}
            onChange={handleSearch}
            style={{
              borderRadius: "20px",
              padding: "10px 20px",
              width: "100%",
            }}
          />
        </div>

        {/* NavLinklər sağda */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            {navLinks.map((link) => (
              <NavItem key={link.path}>
                <NavLink
                  className="nav-link"
                  to={link.path}
                  activeClassName="active"
                  exact
                >
                  {link.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
