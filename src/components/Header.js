import React from 'react';
import { Link } from 'react-router';
class Header extends React.Component {
    render() {

        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );


        const logoutButton = (
            <li>
                <a>
                    <Link onClick={this.props.onLogout}>
                        <i className="material-icons">lock_open</i>
                    </Link>
                </a>
            </li>
        );

        /*
        * a 태그 대신에 react-router 의 Link 컴포넌트를 사용했는데요,

         이 컴포넌트는 페이지를 새로 로딩하는것을 막고, 라우트에 보여지는 내용만 변하게 해줍니다

         (만약에 a 태그로 이동을하게된다면 페이지를 처음부터 새로 로딩하게됩니다)
        * */
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


/*
* props 의 type 과 기본값을 설정하는건 optional입니다. 즉, 귀찮으면 안해도 돼요!

 하지만, 이렇게 하는편이 나중에 읽기 편하고 유지보수하기가 쉬워지니까 하도록 하겠습니다.
* */
Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};


export default Header;