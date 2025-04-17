"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/loginSlice";

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
      router.push("/Dashboard");
    } else {
      router.push("/AuthPage");
    }
  }, []);

  return <div>Redirecting...</div>;
}
