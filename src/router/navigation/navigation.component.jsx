import { Fragment , useContext} from "react";
import {Outlet, Link} from 'react-router-dom';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { userContext } from "../../contexts/user.context";
import {CartContext} from '../../contexts/cart.context'
import {signOutUser} from '../../Utils/firebase/firebase-utils'
import './navigation.styles.scss'

const Navigation = () => {
  const{currentUser} = useContext(userContext);
  const {isCartOpen} = useContext(CartContext);
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                 <CrownLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={'/shop'}>
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                        ): (<Link className="nav-link" to={'/auth'}>
                        Sign In
                    </Link>)}
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;