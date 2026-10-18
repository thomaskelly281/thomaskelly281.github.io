'use client';

import { useRouter } from 'next/navigation';
import { CaseStudyDrawer } from '../../components/CaseStudyDrawer';
import { BlokCaseStudy } from '../../components/case-study/BlokCaseStudy';

export default function BlokModalPage() {
  const router = useRouter();

  return (
    <CaseStudyDrawer title="Blok" open onDismiss={() => router.back()}>
      <BlokCaseStudy />
    </CaseStudyDrawer>
  );
}
