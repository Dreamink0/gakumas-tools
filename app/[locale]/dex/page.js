import { setRequestLocale } from "next-intl/server";
import Dex from "@/components/Dex";
import { generateMetadataForTool } from "@/utils/metadata";

export async function generateMetadata({ params: { locale } }) {
  return await generateMetadataForTool("dex", locale);
}

export default function DexPage({ params: { locale } }) {
  setRequestLocale(locale);
  return <Dex />;
}
