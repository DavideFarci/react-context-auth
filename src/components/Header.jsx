import { NavLink } from "react-router-dom";

function NavbarLink({ href, children }) {
  return (
    <NavLink
      to={href}
      className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary"
    >
      {children}
    </NavLink>
  );
}

const Header = () => {
  return (
    <header className="h-20 flex justify-between items-center bg-green-700 px-2">
      <h2 className="text-xl font-bold">Blog</h2>
      <nav>
        <ul className="flex items-center">
          <li>
            <NavbarLink href="/">Home</NavbarLink>
          </li>
          <li>
            <NavbarLink href="/posts">Bacheca</NavbarLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
