import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface ContributionData {
  total: { [year: string]: number };
}

const cache: Record<string, ContributionData> = {};

const GitHubContributions = ({ username }: { username: string }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const fetchData = useCallback(async (y: number) => {
    const key = `${username}-${y}`;
    if (cache[key]) {
      setData(cache[key]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${y}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json: ContributionData = await res.json();
      cache[key] = json;
      setData(json);
    } catch {
      // silently fail  image is always shown
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (isInView) fetchData(year);
  }, [year, isInView, fetchData]);

  const years = Array.from({ length: currentYear - 2021 }, (_, i) => 2022 + i);
  const totalContributions = data?.total?.[year.toString()] ?? 0;

  return (
    <div ref={ref}>
      <div className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-dark-500">
            GitHub Contributions
          </h3>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            View Profile →
          </a>
        </div>

        {/* Cropped contribution graph image */}
        <motion.div
          className="rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-full overflow-hidden rounded-xl"
            style={{ height: '160px' }}
          >
            <img
              src="/assets/images/github-contributions.png"
              alt="GitHub Contribution Graph"
              className="w-full h-auto"
              style={{
                marginTop: '-74%',
                objectFit: 'cover',
              }}
            />
          </div>
        </motion.div>

        {/* Dynamic stats below image */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-light-400 gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Contribution count */}
          <div>
            {loading ? (
              <div className="h-5 w-48 bg-light-300 rounded animate-pulse" />
            ) : (
              <p className="text-sm text-dark-100">
                <span className="font-bold text-lg text-dark-500">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions in {year}
              </p>
            )}
          </div>

          {/* Year tabs */}
          <div className="flex gap-1 bg-light-300 rounded-lg p-1">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  y === year
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-100 hover:text-dark-500'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubContributions;
