import fs from 'fs-extra';
import { homedir } from 'os';
import path from 'path';
import tempDir from 'temp-dir';
import { v4 as uuidv4 } from 'uuid';

import gitCommitInfo from '../index';

const fixtures = path.join(tempDir, 'sgc', uuidv4());
const localFixtures = path.join(process.cwd(), '__tests__', 'fixtures');

const folders = [
  'upToDate',
  'multiline',
  'merge',
];

beforeAll(() => {
  fs.copySync(localFixtures, fixtures);
  folders.map((folder) => fs.renameSync(path.join(fixtures, folder, 'git'), path.join(fixtures, folder, '.git')));
});

afterAll(() => {
  folders.map((folder) => fs.renameSync(path.join(fixtures, folder, '.git'), path.join(fixtures, folder, 'git')));
});

test('up to date', () => {
  const latestInfo = gitCommitInfo({ cwd: path.join(fixtures, 'multiline') });

  expect(latestInfo.message).toBe('do not merge');
  expect(latestInfo.author).toBe('JPeer264');
  expect(latestInfo.email).toBe('jan.oster94@gmail.com');
  expect(latestInfo.commit).toBe('19131a4a9465f38a5cab030beb173edd6e23c6de');
  expect(latestInfo.shortCommit).toBe('19131a4');
});

test('specific commit', () => {
  const latestInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'multiline'),
    commit: '66d6043fb740278dac391ad8b41df74ef9e68afc',
  });

  expect(latestInfo.message).toBe('Add: index.js\n    \n    Here is more information in the body\n    \n    BREAKING CHANGE: yes, here is a footer');
  expect(latestInfo.author).toBe('JPeer264');
  expect(latestInfo.email).toBe('jan.oster94@gmail.com');
  expect(latestInfo.commit).toBe('66d6043fb740278dac391ad8b41df74ef9e68afc');
  expect(latestInfo.shortCommit).toBe('66d6043');
});

test('unknown commit hash', () => {
  const latestInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'multiline'),
    commit: 'does not work',
  });

  expect(!!latestInfo.error).toBe(true);
});

test('check up to date', () => {
  const mergeInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'upToDate'),
    commit: '31107b9051efe17e57c583937e027993860b11a9',
  });

  expect(mergeInfo.commit).toBe('31107b9051efe17e57c583937e027993860b11a9');
  expect(mergeInfo.message).toBe('Initial commit');
});

test('merge conflict - named automatically', () => {
  const mergeInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'merge'),
    commit: '76d090566587fa5e97035b8c133866eb0116d7c0',
  });

  expect(mergeInfo.commit).toBe('76d090566587fa5e97035b8c133866eb0116d7c0');
  expect(mergeInfo.message).toBe('Merge branch \'test/merge\'');
});

test('merge conflict - named randomly', () => {
  const mergeInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'merge'),
    commit: 'e49bfdc2285f13aa5cc206a02a4f41b335026ea5',
  });

  expect(mergeInfo.commit).toBe('e49bfdc2285f13aa5cc206a02a4f41b335026ea5');
  expect(mergeInfo.message).toBe('My message');
});

test('no git repo', () => {
  const latestInfo = gitCommitInfo({
    cwd: homedir(),
  });

  expect(latestInfo).toEqual({});
});

test('ignore invalid commits | #24', () => {
  const latestInfo = gitCommitInfo({
    cwd: path.join(fixtures, 'merge'),
    commit: '82442c2405804d7aa44e7bedbc0b93bb17707626 || touch ci ||',
  });

  expect(latestInfo.error).toBeInstanceOf(Error);
});
