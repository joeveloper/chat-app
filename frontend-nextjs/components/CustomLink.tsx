import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CustomLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  href: string;
  label: React.ReactNode;
  className?: string;
}

export default function CustomLink({ href, label, className = '', ...props }: CustomLinkProps) {
  return (
    <Link href={href} className={cn('text-blue-600', className)} {...props}>
      {label}
    </Link>
  );
}
