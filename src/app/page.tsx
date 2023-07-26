"use client";
import { useEffect } from "react";
import Call from "./Call";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "./apis/store";

export default function Home() {
  const login = () => {
    const config = {
      method: "post",
      url: "https://frontend-test-api.aircall.io/auth/login",
      data: {
        username: "iqrafareed",
        password: "123456789",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.access_token);
        const accessToken = response?.data?.access_token;
        localStorage.setItem("token", accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    login();
  }, []);
  return <Call />;
}
