import { languages } from '@nsis/language-data';
import { pascalCase } from 'change-case';
import { beforeAll, describe, test } from 'vitest';
import assert from 'yeoman-assert';
import type { PromptAnswers } from 'yeoman-generator';
import { helper } from './helper.ts';

// Test a representative subset of languages with different characteristics
const languagesToTest = [
	{ key: 'English', name: 'Test Language' },
	{ key: 'German', name: 'Testsprache' },
	{ key: 'Arabic', name: 'لغة اختبار' },
	{ key: 'Japanese', name: 'テスト言語' },
];

languagesToTest.forEach(({ key, name }) => {
	describe(`with ${key} language`, () => {
		const langData = languages[key];
		const expectedFileName = pascalCase(name);

		beforeAll(async () => {
			await helper({
				name,
				language: key,
				id: String(langData.id),
				fontName: langData.font.name || '-',
				fontSize: langData.font.size ? String(langData.font.size) : '-',
				codePage: langData.code_page ? String(langData.code_page) : '-',
				rtl: langData.rtl,
				translateStrings: true,
				// Include some string translations
				Branding: langData.strings.Branding,
				SetupCaption: langData.strings.SetupCaption,
				BackBtn: langData.strings.BackBtn,
			} as PromptAnswers);
		});

		test('creates NLF file with proper name', () => {
			assert.file(`${expectedFileName}.nlf`);
		});

		test(`includes correct language ID (${langData.id})`, () => {
			assert.fileContent(`${expectedFileName}.nlf`, String(langData.id));
		});

		test('includes correct RTL setting', () => {
			const rtlValue = langData.rtl ? 'RTL' : 'false';
			assert.fileContent(
				`${expectedFileName}.nlf`,
				new RegExp(`# RTL - anything else than RTL means LTR\\n${rtlValue}`),
			);
		});

		test('includes translated string (Branding)', () => {
			assert.fileContent(`${expectedFileName}.nlf`, langData.strings.Branding);
		});

		test('includes translated string (SetupCaption)', () => {
			assert.fileContent(`${expectedFileName}.nlf`, langData.strings.SetupCaption);
		});
	});
});

describe('languages with font settings', () => {
	describe('Japanese (has font settings)', () => {
		beforeAll(async () => {
			await helper({
				name: 'Japanese Test',
				language: 'Japanese',
				id: '1041',
				fontName: 'ＭＳ Ｐゴシック',
				fontSize: '9',
				codePage: '932',
				rtl: false,
				translateStrings: false,
			} as PromptAnswers);
		});

		test('includes custom font name', () => {
			assert.fileContent('JapaneseTest.nlf', 'ＭＳ Ｐゴシック');
		});

		test('includes custom font size', () => {
			assert.fileContent('JapaneseTest.nlf', /ＭＳ Ｐゴシック\n9/);
		});

		test('includes custom codepage', () => {
			assert.fileContent('JapaneseTest.nlf', /# Codepage - dash \(-\) means ASCII code page\n932/);
		});
	});
});
