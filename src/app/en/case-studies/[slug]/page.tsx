import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-study-detail";
import {
  caseStudyDetailLabelsEn,
  getCaseStudyBySlugEn,
  getCaseStudyStaticParamsEn,
} from "@/data/case-studies.en";

export function generateStaticParams() {
  return getCaseStudyStaticParamsEn();
}

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlugEn(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | SeungJuSuh`,
    description: study.summary,
  };
}

export default async function EnglishCaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlugEn(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetail backHref="/en#work" labels={caseStudyDetailLabelsEn} study={study} />;
}
