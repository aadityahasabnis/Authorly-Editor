// Fetch package info from npm registry

export interface NpmPackageInfo {
  name: string;
  version: string;
  description: string;
  license: string;
  repository?: {
    type: string;
    url: string;
  };
  author?: string;
  keywords?: string[];
  homepage?: string;
  downloads?: {
    weekly: number;
    monthly: number;
  };
}

const PACKAGE_NAME = 'authorly-editor';
const NPM_REGISTRY = 'https://registry.npmjs.org';

// Cache the package info to avoid too many requests
let cachedInfo: NpmPackageInfo | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getPackageInfo(): Promise<NpmPackageInfo> {
  // Return cached data if still valid
  if (cachedInfo && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedInfo;
  }

  try {
    const response = await fetch(`${NPM_REGISTRY}/${PACKAGE_NAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch package info: ${response.statusText}`);
    }

    const data = await response.json();
    const latestVersion = data['dist-tags']?.latest || '0.0.0';
    const versionData = data.versions?.[latestVersion] || {};

    cachedInfo = {
      name: data.name || PACKAGE_NAME,
      version: latestVersion,
      description: data.description || '',
      license: versionData.license || 'MIT',
      repository: versionData.repository,
      author: typeof versionData.author === 'string' 
        ? versionData.author 
        : versionData.author?.name,
      keywords: versionData.keywords || [],
      homepage: versionData.homepage,
    };

    cacheTime = Date.now();
    return cachedInfo;
  } catch (error) {
    console.error('Error fetching npm package info:', error);
    // Return fallback data
    return {
      name: PACKAGE_NAME,
      version: '0.1.5',
      description: 'A rich text editor for authors, blogs, and documentation.',
      license: 'MIT',
    };
  }
}

export async function getPackageVersion(): Promise<string> {
  const info = await getPackageInfo();
  return info.version;
}

export async function getDownloadStats(): Promise<{ weekly: number; monthly: number }> {
  try {
    const [weeklyRes, monthlyRes] = await Promise.all([
      fetch(`https://api.npmjs.org/downloads/point/last-week/${PACKAGE_NAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.npmjs.org/downloads/point/last-month/${PACKAGE_NAME}`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const weeklyData = weeklyRes.ok ? await weeklyRes.json() : { downloads: 0 };
    const monthlyData = monthlyRes.ok ? await monthlyRes.json() : { downloads: 0 };

    return {
      weekly: weeklyData.downloads || 0,
      monthly: monthlyData.downloads || 0,
    };
  } catch (error) {
    console.error('Error fetching download stats:', error);
    return { weekly: 0, monthly: 0 };
  }
}
