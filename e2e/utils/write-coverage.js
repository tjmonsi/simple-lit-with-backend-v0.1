import { writeFileSync, mkdirSync } from 'fs';

const coverages = [];

/**
 *
 * @param {*} coverage
 */
export const writeCoverage = (coverage) => {
  coverages.push(coverage);
  const dir = '.nyc_coverage/tmp';

  mkdirSync(dir, { recursive: true });

  writeFileSync(`.nyc_coverage/tmp/istanbul-${coverages.length}.js`, JSON.stringify(coverage), 'utf8');
};
