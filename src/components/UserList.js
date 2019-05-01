import React, { Fragment, useState } from "react";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import styles from "./UserList.module.scss";
import User from "./User";

const UserDB = [
  {
    id: "huni452",
    name: "조종훈",
    online: true
  },
  {
    id: "htijl",
    name: "이채영",
    online: true,
    picture:
      "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/c0.0.480.480a/p480x480/49555785_521280758353887_103804918548135936_n.jpg?_nc_cat=101&_nc_ht=scontent-icn1-1.xx&oh=f07379009ef130319df2da7daae1e1cf&oe=5D2D0E6B"
  },
  {
    id: "jyking95",
    name: "박준영",
    online: false,
    picture:
      "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p320x320/19260767_1143158262457524_5740474800572561609_n.jpg?_nc_cat=108&_nc_ht=scontent-icn1-1.xx&oh=b3972d2a75c3798d1baaac53910c95c8&oe=5D2F9519"
  },
  {
    id: "jaesoon",
    name: "강재순",
    online: false,
    picture:
      "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320a/p320x320/10444709_1226759930789244_1467646106701709383_n.jpg?_nc_cat=111&_nc_ht=scontent-icn1-1.xx&oh=979bb68b53ca007a985287ba35a6e91c&oe=5D2B27A0"
  },
  {
    id: "kimyeji203",
    name: "김예지",
    online: false,
    picture:
      "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p320x320/45382343_1771392172986631_4774565935799336960_n.jpg?_nc_cat=101&_nc_ht=scontent-icn1-1.xx&oh=5d30795ed311c33ddbfc0c59ca48dfe7&oe=5D6BF4C8"
  }
];

UserDB.sort((a, b) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});

const UserList = () => {
  const [toggleShowList, setToggleShowList] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const filteredSearchUser = UserDB.filter(
    user => user.name.indexOf(keyword) !== -1
  );

  const filteredOnlineUser = filteredSearchUser.filter(user => user.online);

  const filteredOfflineUser = filteredSearchUser.filter(user => !user.online);

  return (
    <Fragment>
      <div
        className={`${styles.list} ${
          toggleShowList ? styles.show : styles.unshow
        }`}
      >
        <TextField
          id="standard-dense"
          label="Search"
          margin="dense"
          onChange={handleChange}
        />
        <div className={styles.onlineBar}>online</div>
        {filteredOnlineUser.map(user => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            picture={user.picture}
          />
        ))}
        <div className={styles.offlineBar}>offline</div>
        {filteredOfflineUser.map(user => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            picture={user.picture}
          />
        ))}
      </div>

      <Icon
        className={styles.toggleShowList}
        fontSize="large"
        color="inherit"
        onClick={() => {
          setToggleShowList(toggleShowList ? false : true);
          console.log(toggleShowList);
        }}
      >
        people
      </Icon>
    </Fragment>
  );
};

export default UserList;
