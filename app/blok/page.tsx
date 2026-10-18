'use client';

import { useRouter } from 'next/navigation';
import Home from '../page';
import { CaseStudyDrawer } from '../components/CaseStudyDrawer';
import { BlokCaseStudy } from '../components/case-study/BlokCaseStudy';

export default function BlokPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <CaseStudyDrawer
        title="Blok"
        open
        onDismiss={() => router.replace('/')}
      >
        <BlokCaseStudy />
      </CaseStudyDrawer>
    </>
  );
}
