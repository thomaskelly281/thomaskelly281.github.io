'use client';

import { useRouter } from 'next/navigation';
import Home from '../page';
import { CaseStudyDrawer } from '../components/CaseStudyDrawer';
import { AgenticStudioCaseStudy } from '../components/case-study/AgenticStudioCaseStudy';

export default function AgenticStudioPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <CaseStudyDrawer
        title="Agentic Studio"
        open
        onDismiss={() => router.replace('/')}
      >
        <AgenticStudioCaseStudy />
      </CaseStudyDrawer>
    </>
  );
}
