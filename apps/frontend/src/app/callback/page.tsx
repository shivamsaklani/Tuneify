"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/loginSlice";
import { Animate } from "./animate";

export default function Callback() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  console.log(searchParams);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token));
      setTimeout(() => {
        router.push("/Dashboard");
      }, 4000); 
    } else {
      setTimeout(() => {
        router.push("/AuthPage");
      }, 4000); 
      
    }
  }, [router,searchParams,dispatch]);

  return <Animate/>;
}
