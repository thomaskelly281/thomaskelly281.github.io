'use client';

import { useRouter } from 'next/navigation';
import Home from '../page';
import { CaseStudyDrawer } from '../components/CaseStudyDrawer';
import { DamCaseStudy } from '../components/case-study/DamCaseStudy';

export default function DamPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <CaseStudyDrawer
        title="SitecoreAI DAM"
        open
        onDismiss={() => router.replace('/')}
      >
        <DamCaseStudy />
      </CaseStudyDrawer>
    </>
  );
}
