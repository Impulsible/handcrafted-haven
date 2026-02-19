import { connection } from "next/server";
import AboutContent from "./AboutContent";

export default async function AboutPage() {
  await connection();
  
  return <AboutContent />;
}