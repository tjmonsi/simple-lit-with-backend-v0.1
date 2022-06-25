import v8toIstanbul from 'v8-to-istanbul';
import { writeCoverage } from './write-coverage.js';

/**
 *
 * @param {*} coverage
 */
export const processCoverage = async (coverage) => {
  for (const entry of coverage) {
    const { source = '', url } = entry;

    try {
      if (url.indexOf('node_modules') < 0 && url.indexOf('script.js') < 0) {
        const [, newUrlStage] = url.split('/./');
        const [newurl] = newUrlStage.split('?');

        console.log(newurl);
        const converter = v8toIstanbul('', 0, {
          source
        });
        await converter.load();
        converter.applyCoverage(entry.functions);

        writeCoverage(converter.toIstanbul());
      }
    } catch (error) {
      console.error(error);
    }
  }
};
