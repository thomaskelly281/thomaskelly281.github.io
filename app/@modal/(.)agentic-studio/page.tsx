'use client';

import { useRouter } from 'next/navigation';
import { CaseStudyDrawer } from '../../components/CaseStudyDrawer';
import { AgenticStudioCaseStudy } from '../../components/case-study/AgenticStudioCaseStudy';

export default function AgenticStudioModalPage() {
  const router = useRouter();

  return (
    <CaseStudyDrawer title="Agentic Studio" open onDismiss={() => router.back()}>
      <AgenticStudioCaseStudy />
    </CaseStudyDrawer>
  );
}
