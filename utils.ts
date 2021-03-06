import { resolve } from 'path';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import parse from 'csv-parse/lib/sync';
import stringify from 'csv-stringify/lib/sync';

/**
 * Read a CSV input file and parse the contents
 *
 * @param {string} target - Path to the input file
 * @returns {Record<string, any>[]} - Array of objects
 */
export function readInput(
  target: string = resolve(process.cwd(), 'input.csv'),
): Record<string, any>[] {
  if (!existsSync(target)) {
    throw new Error('Input file does not exist!');
  }

  const contents = readFileSync(target).toString('utf-8');
  const records: Record<string, any>[] = parse(contents, {
    columns: true,
    skipEmptyLines: true,
    encoding: 'utf-8',
    autoParse: true,
  });

  return records;
}

/**
 * Write result to the output CSV file.
 *
 * @param {Record<string, any>[]} data - data to be written
 * @param {string} target - output file name
 */
export function writeOutput(
  data: Record<string, any>[],
  target: string = resolve(process.cwd(), 'output.csv'),
): void {
  const stringified = stringify(data, {
    header: true,
    columns: Object.keys(data[0]),
    eof: true,
  });

  writeFileSync(target, stringified);
}
