import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";
import { signInType, signOutType, userInfoType } from "./redux/actionTypes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Transactions from "./components/Transactions/Transactions";
import AddInfo from "./components/info/AddInfo";
//import Main from "./components/cards/Main";
const Main = lazy(() => import("./components/cards/Main"));
//import Nav from "./components/cards/Nav";
const Nav = lazy(() => import("./components/cards/Nav"));
//import Footer from "./components/footer/Footer";
const Footer = lazy(() => import("./components/footer/Footer"));
//import Home from "./components/home/Home";
const Home = lazy(() => import("./components/home/Home"));
//import Users from "./components/admin/Users";
const Users = lazy(() => import("./components/admin/Users"));
//import Login from "./components/log/Login";
const Login = lazy(() => import("./components/log/Login"));
//import Addcards from "./components/add cards/Addcards";
const Addcards = lazy(() => import("./components/add cards/Addcards"));
//       <Main update={false}></Main>

interface user {
  admin: boolean;
  balance: number;
  email: string;
  imgUrl: string;
  username: string;
}
function App() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<user>();

  useEffect(() => {
    // keeping the user in
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: signInType.type,
          user,
        });
      } else {
        dispatch({
          type: signOutType.type,
          user: null,
        });
      }
    });
  }, [user]);

  useEffect(() => {
    // getting the users info
    db.collection("users")
      .doc(user?.uid)
      .onSnapshot((s: any) => {
        setUserInfo(s.data());
      });
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      dispatch({
        type: userInfoType.type,
        info: userInfo,
      });
    }
  }, [userInfo]);

  return (
    <div className="App">
      {!user ? (
        <Suspense fallback={<Loading></Loading>}>
          <Login></Login>
        </Suspense>
      ) : (
        <Router>
          <Suspense fallback={<Loading></Loading>}>
            <Switch>
              <Route exact path="/info">
                <Nav></Nav>
                <AddInfo></AddInfo>
                <Footer></Footer>
              </Route>
              <Route exact path="/Transactions">
                <Nav></Nav>
                <Transactions></Transactions>
                <Footer></Footer>
              </Route>
              <Route exact path="/users/admin">
                <Nav></Nav>
                <Users></Users>
                <Footer></Footer>
              </Route>
              <Route exact path="/cards/:typeId/add_card">
                <Nav></Nav>
                <Addcards params={true}></Addcards>
                <Footer></Footer>
              </Route>
              <Route exact path="/cards/:typeId/add_card/type">
                <Nav></Nav>
                <Addcards params={false}></Addcards>
                <Footer></Footer>
              </Route>
              <Route exact path="/cards/:typeId">
                <Nav></Nav>
                <Main update={false}></Main>
                <Footer></Footer>
              </Route>
              <Route exact path="/cards/:typeId/:catagId/update">
                <Nav></Nav>
                <Main update={true}></Main>
                <Footer></Footer>
              </Route>
              <Route path="/">
                <Home></Home>
                <Footer></Footer>
              </Route>
            </Switch>
          </Suspense>
        </Router>
      )}
    </div>
  );
}

export default App;
