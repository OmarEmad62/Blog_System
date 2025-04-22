
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <header>
    <Link to='/' className='logo'>📝BLOG</Link>
    <nav>
      
      <Link to='/create'>New</Link>
      <Link to='/Reorder'>Reorder</Link>
    
    </nav>
    </header>
  )
}

export default Header
