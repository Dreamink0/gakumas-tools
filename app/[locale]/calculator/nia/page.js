import { setRequestLocale } from "next-intl/server";
import { generateMetadataForTool } from "@/utils/metadata";
import NiaCalculator from "@/components/ProduceRankCalculator/NiaCalculator";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return await generateMetadataForTool("niaCalculator", locale);
}

export default async function ProduceRankCalculatorPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NiaCalculator />;
}
