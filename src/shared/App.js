import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { getCookie } from "../utils/cookie";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { actionCreators as userActions } from "../redux/modules/user";
import Header from "../components/Header";
import Login from "../pages/LogIn";
import PostList from "../pages/PostList";
import SignUp from "../pages/SignUp";



function App() {
  // 1. cookie가 있는지 확인 => getcookie
  const user = useSelector((state) => state.user.user);
  const userByCookie = getCookie("user");
  const dispatch = useDispatch();

  useEffect(() => {
    // 사용자 정보가 redux state에는 있지만 cookie에는 없을 때, 로그인 정보 초기화
    if (!user && userByCookie) {
      dispatch(userActions.setUser(getCookie("user")));
    }
    if (user && !userByCookie) {
      dispatch(userActions.setUser(null));
    }
  }, [dispatch, user, userByCookie]);

  return (
   <React.Fragment>
     <ConnectedRouter history={history}>
      <Header />
      <Switch>
      <Route path="/" exact component={PostList} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      </Switch>
     </ConnectedRouter>
    
   </React.Fragment>
  );
}

export default App;
