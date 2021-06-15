import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import UserRow from "./UserRow";
import "./users.css";
interface users {
  id: string;
  admin: boolean;
  balance: number;
  username: string;
  email: string;
  imgUrl: string;
}

interface state {
  userInfo: users;
}
export default function Users() {
  const [users, setUsers] = useState<users[]>();
  const [searchUsers, setSearchUsers] = useState<users[]>();
  const [search, setSearch] = useState("");

  const userInfo = useSelector((state: state) => state.userInfo);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  useEffect(() => {
    let isMounted = true;

    db.collection("users").onSnapshot((s) => {
      if (isMounted) {
        setUsers(
          s.docs.map((user) => {
            return {
              id: user.id,
              admin: user.data().admin,
              balance: user.data().balance,
              username: user.data().username.toUpperCase(),
              email: user.data().email,
              imgUrl: user.data().imgUrl,
            };
          })
        );
        setSearchUsers(
          s.docs.map((user) => {
            return {
              id: user.id,
              admin: user.data().admin,
              balance: user.data().balance,
              username: user.data().username.toUpperCase(),
              email: user.data().email,
              imgUrl: user.data().imgUrl,
            };
          })
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    searchFun();
  }, [search]);

  const searchFun = () => {
    if (searchUsers) {
      setUsers(
        searchUsers.filter((obj) => {
          if (
            obj.username.indexOf(search.toUpperCase().replace(/\s/g, "")) > -1
          ) {
            return obj.username;
          }
        })
      );
    }
  };

  return (
    <div>
      {userInfo?.admin ? (
        <div className="users">
          <TextField
            className="users_search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            label="Search"
            variant="outlined"
          ></TextField>
          <div className="users_hr"></div>

          {users?.map((user) => {
            return (
              <UserRow
                key={user.id}
                id={user.id}
                admin={user.admin}
                balance={user.balance}
                username={user.username}
                imgUrl={user.imgUrl}
                email={user.email}
              ></UserRow>
            );
          })}
        </div>
      ) : (
        <div className="nonAdmin">
          You dont have the permission to this page
        </div>
      )}
    </div>
  );
}
