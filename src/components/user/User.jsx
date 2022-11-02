import React, { useEffect, useState } from "react";
import Design from "../../assets/design.svg";
import man from "../../assets/man.svg";
import woman from "../../assets/woman.svg";
import email from "../../assets/mail.svg";
import gum from "../../assets/growing-up-man.svg";
import guw from "../../assets/growing-up-woman.svg";
import map from "../../assets/map.svg";
import phone from "../../assets/phone.svg";
import padlock from "../../assets/padlock.svg";
import "./User.css";
import axios from "axios";

const initialTable = [];
let personData;
let name;
let person;
const User = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverData, setHoverData] = useState({
    text1: "",
    text2: "",
  });
  const [add, setAdd] = useState(initialTable);

  const getUser = async () => {
    const url = "https://randomuser.me/api/";
    setLoading(true);
    try {
      const response = await axios(url);
      person = response.data.results[0];
      const {
        email,
        gender,
        phone,
        dob: { age },
        picture: { large: image },
        name: { first, last },
        location: { country },
        login: { password },
      } = person;
      name = `${first} ${last}`;
      personData = {
        email,
        gender,
        name,
        image,
        age,
        country,
        phone,
        password,
      };
      setUserInfo(personData);
      setHoverData({
        text1: "My Name is",
        text2: personData.fullname,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log(userInfo);

  const hoverHandler = (e) => {
    const { name } = e.target;
    setHoverData({ text1: `my ${name} is `, text2: userInfo[name] });
  };
  const handleAdd = () => {
    !add.some((item) => item.firstname === personData.name)
      ? setAdd([
          ...add,
          {
            firstname: personData.name,
            email: personData.email,
            phone: personData.phone,
          },
        ])
      : alert("this user has already been added");
  };

  return (
    <div className="container">
      <div className="user-img d-flex justify-content-center mt-5">
        <img
          src={userInfo?.image}
          width="150px"
          alt="foto"
          className="rounded-circle border border-dark p-1 img-bg"
        />
      </div>
      <div className="text-center mt-4 ">
        <div>{hoverData.text1}</div>
        <div>{hoverData.text2}</div>
      </div>
      <div className="user-info mt-5 d-flex justify-content-center align-items-center">
        <img
          onMouseOver={hoverHandler}
          name="name"
          src={userInfo.gender === "male" ? man : woman}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
        <img
          onMouseOver={hoverHandler}
          name="email"
          src={email}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
        <img
          onMouseOver={hoverHandler}
          name="age"
          src={userInfo.gender === "male" ? gum : guw}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
        <img
          onMouseOver={hoverHandler}
          name="country"
          src={map}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
        <img
          onMouseOver={hoverHandler}
          name="phone"
          src={phone}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
        <img
          onMouseOver={hoverHandler}
          name="password"
          src={padlock}
          width="70px"
          className="rounded-circle border border-dark p-1 btn mx-4 bg-white"
          alt=""
        />
      </div>
      <div className="btns mt-4 d-flex justify-content-center gap-4">
        <button
          disabled={loading}
          className="btn btn-success"
          onClick={() => getUser()}
        >
          {loading ? "Loading" : "New User"}
        </button>
        <button onClick={handleAdd} className="btn btn-warning">
          Add User
        </button>
      </div>
      <div className="table mt-4">
        {!!add.length && (
          <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {add.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.firstname}</td>
                    <td>{item.email}</td>
                    <td>+{item.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default User;
