import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
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

export default function Users() {
  const [users, setUsers] = useState<users[]>();
  const [searchUsers, setSearchUsers] = useState<users[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    db.collection("users").onSnapshot((s) => {
      setUsers(
        s.docs.map((user) => {
          return {
            id: user.id,
            admin: user.data().admin,
            balance: user.data().balance,
            username: user.data().username,
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
            username: user.data().username,
            email: user.data().email,
            imgUrl: user.data().imgUrl,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    searchFun();
  }, [search]);

  const searchFun = () => {
    if (searchUsers) {
      setUsers(
        searchUsers.filter((obj) => {
          if (
            obj.username.indexOf(search.toLowerCase().replace(/\s/g, "")) > -1
          ) {
            return obj.username;
          }
        })
      );
    }
  };

  return (
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
  );
}
