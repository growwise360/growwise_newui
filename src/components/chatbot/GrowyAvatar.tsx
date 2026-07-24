import Image from 'next/image';
import { cn } from '@/lib/utils';

export const GROWY_AVATAR_SRC = '/assets/chatbot/growy-avatar.png';

const SIZE_PX = {
  xs: 16,
  sm: 20,
  md: 32,
  lg: 40,
} as const;

type GrowyAvatarProps = {
  size?: keyof typeof SIZE_PX;
  className?: string;
  ringClassName?: string;
};

export function GrowyAvatar({ size = 'md', className, ringClassName }: GrowyAvatarProps) {
  const px = SIZE_PX[size];

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden rounded-full bg-white',
        ringClassName,
        className,
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={GROWY_AVATAR_SRC}
        alt=""
        width={px}
        height={px}
        className="h-full w-full object-cover object-[center_15%]"
        aria-hidden
      />
    </span>
  );
}
