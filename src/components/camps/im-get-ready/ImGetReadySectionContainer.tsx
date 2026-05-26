import type { ComponentProps } from 'react';

import { SectionContainer } from '@/components/camps/SectionContainer';
import { cn } from '@/lib/utils';

import { IM_GET_READY_SECTION } from '@/components/camps/im-get-ready/im-get-ready-layout';

type ImGetReadySectionContainerProps = ComponentProps<typeof SectionContainer>;

export function ImGetReadySectionContainer({
  className,
  ...props
}: ImGetReadySectionContainerProps) {
  return <SectionContainer className={cn(IM_GET_READY_SECTION, className)} {...props} />;
}
