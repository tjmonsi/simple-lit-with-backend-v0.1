import { writeFileSync, readdirSync, readFileSync, lstatSync } from 'fs';
import { extname } from 'path';

/**
 *
 * @param {string} path
 */
function updateDate (path) {
  const docs = readdirSync(path);
  for (const file of docs) {
    try {
      const newFile = `${path}/${file}`;
      const fileStat = lstatSync(newFile);
      if (fileStat.isFile() && extname(newFile) === '.md') {
        const text = readFileSync(newFile, 'utf8');
        const dateModified = new Date(fileStat.mtime);
        const dateModifiedString = dateModified.toISOString();

        const oldDate = text.match(/date:\s\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/);

        if (oldDate && oldDate.length > 0) {
          const [, oldDateModified] = oldDate[0].split('date: ');
          const oldDateModifiedDate = new Date(oldDateModified);
          const diff = dateModified.getTime() - oldDateModifiedDate
            .getTime();

          // check if last update is 5 min ago
          if (diff > (5 * 60 * 1000)) {
            const newText = text.replace(/date:\s\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/, `date: ${dateModifiedString}`);

            writeFileSync(newFile, newText, 'utf8');
          }
        }
      }

      if (fileStat.isDirectory()) {
        updateDate(newFile);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

updateDate('docs');
