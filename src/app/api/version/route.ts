import { NextResponse } from 'next/server';
import { getPackageInfo, getDownloadStats } from '@/lib/npm';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const [packageInfo, downloadStats] = await Promise.all([
      getPackageInfo(),
      getDownloadStats(),
    ]);

    return NextResponse.json({
      version: packageInfo.version,
      name: packageInfo.name,
      description: packageInfo.description,
      license: packageInfo.license,
      downloads: downloadStats,
    });
  } catch (error) {
    console.error('Error fetching package info:', error);
    return NextResponse.json(
      { version: '0.1.5', error: 'Failed to fetch package info' },
      { status: 500 }
    );
  }
}
