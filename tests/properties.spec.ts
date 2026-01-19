import { pascalCase } from 'change-case';
import { beforeAll, describe, test } from 'vitest';
import assert from 'yeoman-assert';
import type { PromptAnswers } from 'yeoman-generator';
import { helper } from './helper.ts';

describe('name property', () => {
	const names = [
		{ input: 'My Language', expected: 'MyLanguage.nlf' },
		{ input: 'test-language', expected: 'TestLanguage.nlf' },
		{ input: 'awesome_lang', expected: 'AwesomeLang.nlf' },
		{ input: 'français', expected: 'Français.nlf' },
		{ input: 'SHOUTING CASE', expected: 'ShoutingCase.nlf' },
	];

	names.forEach(({ input, expected }) => {
		describe(`with name "${input}"`, () => {
			beforeAll(async () => {
				await helper({
					name: input,
					language: 'English',
					id: '1033',
					fontName: '-',
					fontSize: '-',
					codePage: '-',
					rtl: false,
					translateStrings: false,
				} as PromptAnswers);
			});

			test(`creates file with PascalCase name: ${expected}`, () => {
				assert.file(expected);
			});
		});
	});
});

describe('RTL property', () => {
	describe('when rtl is true', () => {
		beforeAll(async () => {
			await helper({
				name: 'RTL Test',
				language: 'Arabic',
				id: '1025',
				fontName: '-',
				fontSize: '-',
				codePage: '1256',
				rtl: true,
				translateStrings: false,
			} as PromptAnswers);
		});

		test('sets RTL in output', () => {
			assert.fileContent('RtlTest.nlf', /# RTL - anything else than RTL means LTR\nRTL/);
		});
	});

	describe('when rtl is false', () => {
		beforeAll(async () => {
			await helper({
				name: 'LTR Test',
				language: 'English',
				id: '1033',
				fontName: '-',
				fontSize: '-',
				codePage: '-',
				rtl: false,
				translateStrings: false,
			} as PromptAnswers);
		});

		test('sets false in output', () => {
			assert.fileContent('LtrTest.nlf', /# RTL - anything else than RTL means LTR\nfalse/);
		});
	});
});

describe('font properties', () => {
	const fontConfigs = [
		{ name: 'Arial', size: '10', testName: 'Font Test Arial' },
		{ name: 'MS Sans Serif', size: '8', testName: 'Font Test Sans' },
		{ name: 'ＭＳ Ｐゴシック', size: '9', testName: 'Font Test Gothic' },
	];

	fontConfigs.forEach(({ name: fontName, size, testName }) => {
		describe(`with font ${fontName} size ${size}`, () => {
			const expectedFileName = `${pascalCase(testName)}.nlf`;

			beforeAll(async () => {
				await helper({
					name: testName,
					language: 'English',
					id: '1033',
					fontName,
					fontSize: size,
					codePage: '-',
					rtl: false,
					translateStrings: false,
				} as PromptAnswers);
			});

			test('includes font name in output', () => {
				assert.fileContent(expectedFileName, fontName);
			});

			test('includes font size in output', () => {
				assert.fileContent(expectedFileName, new RegExp(`${fontName.replace(/[()]/g, '\\$&')}\\n${size}`));
			});
		});
	});
});

describe('codePage property', () => {
	const codePages = [
		{ codePage: '1252', testName: 'CodePage Test 1252' },
		{ codePage: '1256', testName: 'CodePage Test 1256' },
		{ codePage: '932', testName: 'CodePage Test 932' },
		{ codePage: '65001', testName: 'CodePage Test 65001' },
	];

	codePages.forEach(({ codePage, testName }) => {
		describe(`with codePage ${codePage}`, () => {
			const expectedFileName = `${pascalCase(testName)}.nlf`;

			beforeAll(async () => {
				await helper({
					name: testName,
					language: 'English',
					id: '1033',
					fontName: '-',
					fontSize: '-',
					codePage,
					rtl: false,
					translateStrings: false,
				} as PromptAnswers);
			});

			test(`includes codePage ${codePage} in output`, () => {
				assert.fileContent(
					expectedFileName,
					new RegExp(`# Codepage - dash \\(-\\) means ASCII code page\\n${codePage}`),
				);
			});
		});
	});
});
