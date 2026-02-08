'use client';

interface VersionBadgeProps {
  version: string;
}

export function VersionBadge({ version }: VersionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-gradient mb-8">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-sm font-medium">v{version} — Now available on npm</span>
    </div>
  );
}
