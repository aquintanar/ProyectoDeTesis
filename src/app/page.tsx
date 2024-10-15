import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import Auth from "./pages/Auth";

import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import ToasterProvider from "./providers/ToasterProvider";



export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings  = await getListings();
  const isEmpty = true;

  


  return (
    <>
      <ToasterProvider/>
      <Auth/>
    </>
  );
}
