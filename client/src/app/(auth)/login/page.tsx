"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "@/app/ui/home.module.css"; // Assuming the CSS module is in this path
import Image from "next/image";

const Login: React.FC = () => {
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/survey");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <>Loading...</>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={style.signup}>

        <div className={style.signupbody}>
        <h1 className={style.headingS}>Sign In</h1>

          {errMsg && <p className="text-red-600 text-[16px] mb-4">{errMsg}</p>}
          <button
            className={style.btnS}
            onClick={() => signIn("github")}
          >
            <Image src="/images/gitLogo.png" alt="GitHub Logo" width={40} height={40} className={style.gitlogo} />
            Sign In with GitHub
          </button>
          {/* <Link href="/register" className={style.visitL}>Register here!</Link> */}
        </div>
      </div>
    )
  );
};

export default Login;
