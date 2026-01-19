declare module '@nsis/language-data' {
	export interface LanguageFont {
		name: string | null;
		size: number | null;
	}

	export interface LanguageStrings {
		[key: string]: string;
	}

	export interface Language {
		header: string;
		id: number;
		font: LanguageFont;
		code_page: number | null;
		rtl: boolean;
		strings: LanguageStrings;
	}

	export interface Languages {
		[languageName: string]: Language;
	}

	export const languages: Languages;
}
