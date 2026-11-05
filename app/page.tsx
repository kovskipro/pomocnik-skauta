import HomePageClient from "./home-page-client";
import { getAllFunctions } from "@/lib/functions-server";

export default async function HomePage() {
  const functions = await getAllFunctions();

  return <HomePageClient initialFunctions={functions} />;
}
