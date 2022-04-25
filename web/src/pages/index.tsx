import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React from "react";

export default function Home() {

  const user = useUser();
  console.log(user);

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req,res);

  console.log(session);
  if(!session){
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }else{
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }
}