import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        VISUALS<span>2.0</span>
      </Link>

      {/* DESKTOP */}

      <nav className="nav-links">

        <Link to="/">
          Home
        </Link>

        <a href="/#work">
          Work
        </a>

        <Link to="/services">
          Services
        </Link>

        <Link to="/about">
          About
        </Link>

        <a href="/about#contact">
          Contact
        </a>

      </nav>

      <a
        href="/about#contact"
        className="nav-book"
      >
        Book Now
      </a>

      {/* MOBILE BUTTON */}

      <button
        className="menu-button"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <X size={25} />
        ) : (
          <Menu size={25} />
        )}
      </button>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
            }}
          >

            <Link
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>

            <a
              href="/#work"
              onClick={closeMenu}
            >
              Work
            </a>

            <Link
              to="/services"
              onClick={closeMenu}
            >
              Services
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
            >
              About
            </Link>

            <a
              href="/about#contact"
              onClick={closeMenu}
            >
              Contact
            </a>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}