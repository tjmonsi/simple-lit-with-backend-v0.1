import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import { readFileSync, readdirSync } from 'fs';

/**
 * @type {*}
 */
const coverages = [];

/**
 *
 * @param {*} coverage
 * @returns {*}
 */
const fixCoverage = (coverage) => {
  for (const key in coverage) {
    const [path] = coverage[`${key}`].path.split('?');
    const pathArray = path.split('/');
    let flag = true;
    while (flag) {
      if (pathArray[0].trim() === 'src') {
        flag = false;
        break;
      }
      pathArray.shift();
      if (pathArray.length === 0) {
        // just in case
        break;
      }
    }
    const newPath = pathArray.join('/');
    coverage[`${key}`].path = newPath;
    coverage[`${newPath}`] = coverage[`${key}`];
    delete coverage[`${key}`];
  }
  return coverage;
};

export const istanbulToLcov = () => {
  const dir = '.nyc_coverage/tmp';
  const files = readdirSync(dir);

  for (const file of files) {
    coverages.push(JSON.parse(readFileSync(`${dir}/${file}`, 'utf8')));
  }

  const newCoverage = fixCoverage(coverages[0]);

  console.log(coverages[0]);

  const coverageMap = libCoverage.createCoverageMap(newCoverage);

  if (coverages.length > 1) {
    for (let i = 1; i < coverages.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
      const map = coverages[i];

      coverageMap.merge(fixCoverage(map));
    }
  }

  const configWatermarks = {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80]
  };

  const context = libReport.createContext({
    dir: '.nyc_coverage',
    // The summarizer to default to (may be overridden by some reports)
    // values can be nested/flat/pkg. Defaults to 'pkg'
    defaultSummarizer: 'nested',
    // @ts-ignore
    watermarks: configWatermarks,
    coverageMap
  });

  const report = reports.create('lcov');
  const report2 = reports.create('text');

  report.execute(context);
  report2.execute(context);
};

istanbulToLcov();
