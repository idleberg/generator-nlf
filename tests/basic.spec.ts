import type { PromptAnswers } from '@idleberg/yeoman-generator';
import { beforeAll, describe, test } from 'vitest';
import assert from 'yeoman-assert';
import { helper } from './helper.ts';

describe('basic NLF file generation', () => {
	beforeAll(async () => {
		await helper({
			name: 'Test Language',
			language: 'English',
			id: '1033',
			fontName: '-',
			fontSize: '-',
			codePage: '-',
			rtl: false,
			translateStrings: false,
		} as PromptAnswers);
	});

	test('creates NLF file', () => {
		assert.file('TestLanguage.nlf');
	});

	test('includes NLF header', () => {
		assert.fileContent('TestLanguage.nlf', 'NLF v6');
	});

	test('includes language ID', () => {
		assert.fileContent('TestLanguage.nlf', '1033');
	});

	test('includes font settings', () => {
		assert.fileContent('TestLanguage.nlf', /# Font and size - dash \(-\) means default\n-\n-/);
	});

	test('includes codepage setting', () => {
		assert.fileContent('TestLanguage.nlf', /# Codepage - dash \(-\) means ASCII code page\n-/);
	});

	test('includes RTL setting', () => {
		assert.fileContent('TestLanguage.nlf', /# RTL - anything else than RTL means LTR\nfalse/);
	});
});
