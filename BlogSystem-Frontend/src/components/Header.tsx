import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <span>📝BLOGIFY</span>
      </Link>
      <nav>
        <Link to="/create">New Post</Link>
        <Link to="/Reorder">Reorder</Link>
      </nav>
    </header>
  );
};

export default Header;
