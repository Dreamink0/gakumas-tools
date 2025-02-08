import { setRequestLocale } from "next-intl/server";
import MemoryCalculator from "@/components/MemoryCalculator";
import { generateMetadataForTool } from "@/utils/metadata";

export async function generateMetadata({ params: { locale } }) {
  return await generateMetadataForTool("memoryCalculator", locale);
}

export default function MemoryCalculatorPage({ params: { locale } }) {
  setRequestLocale(locale);
  return <MemoryCalculator />;
}
