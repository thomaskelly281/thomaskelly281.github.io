'use client';

import { useRouter } from 'next/navigation';
import { CaseStudyDrawer } from '../../components/CaseStudyDrawer';
import { DamCaseStudy } from '../../components/case-study/DamCaseStudy';

export default function DamModalPage() {
  const router = useRouter();

  return (
    <CaseStudyDrawer title="SitecoreAI DAM" open onDismiss={() => router.back()}>
      <DamCaseStudy />
    </CaseStudyDrawer>
  );
}
