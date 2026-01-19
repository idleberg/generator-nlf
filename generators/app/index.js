import { GeneratorCompat as Generator } from '@idleberg/yeoman-generator';
import { languages } from '@nsis/language-data';
import slugify from '@sindresorhus/slugify';
import { pascalCase } from 'change-case';
import { inverse } from 'kleur/colors';

export default class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('store-strings', { desc: 'Store translated language strings for next time', default: false });

		this.storeStrings = this.options.looseVersion;
	}

	languageChoices() {
		return Object.entries(languages)
			.map(([key, value]) => ({
				name: value.long || key,
				value: key,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	async prompting() {
		console.log(/* let it breathe */);

		this.clack.intro(inverse(` ${slugify(this.appname)} `));

		const answers = await this.prompt([
			{
				name: 'name',
				message: "What's the name of the language?",
				store: true,
				validate: (name) =>
					name?.trim().length > 0 && /^[a-zA-Z ]+$/.test(name) ? true : 'Specify a valid language name',
			},
			{
				name: 'language',
				message: "Select the translation you'd like to work with",
				type: 'list',
				choices: this.languageChoices(),
				default: 'English',
				store: true,
			},
			{
				name: 'id',
				message: 'Specify the locale identifier (LCID)',
				default: (answers) => String(languages[answers.language].id),
				validate: (number) => {
					const parsed = Number.parseInt(number, 10);
					return Number.isInteger(parsed) && parsed > 0 ? true : 'Not a valid locale identifier (LCID)';
				},
			},
			{
				name: 'fontName',
				message: 'Specify the Font Name (non-Latin languages only)',
				default: (answers) => (languages[answers.language].font.name ? languages[answers.language].font.name : '-'),
			},
			{
				name: 'fontSize',
				message: 'Specify the Font Size (non-Latin languages only)',
				default: (answers) =>
					languages[answers.language].font.size ? String(languages[answers.language].font.size) : '-',
				validate: (number) => {
					if (number === '-') return true;
					const parsed = Number.parseInt(number, 10);
					return Number.isInteger(parsed) && parsed > 0 ? true : 'Not a valid font size';
				},
			},
			{
				name: 'codePage',
				message: 'Code page',
				default: (answers) =>
					languages[answers.language].code_page ? String(languages[answers.language].code_page) : '-',
				validate: (number) => {
					if (number === '-') return true;
					const parsed = Number.parseInt(number, 10);
					return Number.isInteger(parsed) && parsed > 0 ? true : 'Not a valid code page';
				},
			},
			{
				name: 'rtl',
				message: 'Is it a right-to-left (RTL) language?',
				type: 'confirm',
				default: (answers) => languages[answers.language].rtl === 'RTL',
			},
			{
				name: 'translateStrings',
				message: 'Do you want to continue and translate all strings?',
				type: 'confirm',
				default: true,
			},
			{
				name: 'Branding',
				message: 'Branding',
				default: (answers) => languages[answers.language].strings.Branding,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'SetupCaption',
				message: 'SetupCaption',
				default: (answers) => languages[answers.language].strings.SetupCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UninstallCaption',
				message: 'UninstallCaption',
				default: (answers) => languages[answers.language].strings.UninstallCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'LicenseSubCaption',
				message: 'LicenseSubCaption',
				default: (answers) => languages[answers.language].strings.LicenseSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ComponentsSubCaption',
				message: 'ComponentsSubCaption',
				default: (answers) => languages[answers.language].strings.ComponentsSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DirSubCaption',
				message: 'DirSubCaption',
				default: (answers) => languages[answers.language].strings.DirSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'InstallingSubCaption',
				message: 'InstallingSubCaption',
				default: (answers) => languages[answers.language].strings.InstallingSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CompletedSubCaption',
				message: 'CompletedSubCaption',
				default: (answers) => languages[answers.language].strings.CompletedSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnComponentsSubCaption',
				message: 'UnComponentsSubCaption',
				default: (answers) => languages[answers.language].strings.UnComponentsSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnDirSubCaption',
				message: 'UnDirSubCaption',
				default: (answers) => languages[answers.language].strings.UnDirSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ConfirmSubCaption',
				message: 'ConfirmSubCaption',
				default: (answers) => languages[answers.language].strings.ConfirmSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UninstallingSubCaption',
				message: 'UninstallingSubCaption',
				default: (answers) => languages[answers.language].strings.UninstallingSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnCompletedSubCaption',
				message: 'UnCompletedSubCaption',
				default: (answers) => languages[answers.language].strings.UnCompletedSubCaption,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'BackBtn',
				message: 'BackBtn',
				default: (answers) => languages[answers.language].strings.BackBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'NextBtn',
				message: 'NextBtn',
				default: (answers) => languages[answers.language].strings.NextBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'AgreeBtn',
				message: 'AgreeBtn',
				default: (answers) => languages[answers.language].strings.AgreeBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'AcceptBtn',
				message: 'AcceptBtn',
				default: (answers) => languages[answers.language].strings.AcceptBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DontAcceptBtn',
				message: 'DontAcceptBtn',
				default: (answers) => languages[answers.language].strings.DontAcceptBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'InstallBtn',
				message: 'InstallBtn',
				default: (answers) => languages[answers.language].strings.InstallBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UninstallBtn',
				message: 'UninstallBtn',
				default: (answers) => languages[answers.language].strings.UninstallBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CancelBtn',
				message: 'CancelBtn',
				default: (answers) => languages[answers.language].strings.CancelBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CloseBtn',
				message: 'CloseBtn',
				default: (answers) => languages[answers.language].strings.CloseBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'BrowseBtn',
				message: 'BrowseBtn',
				default: (answers) => languages[answers.language].strings.BrowseBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ShowDetailsBtn',
				message: 'ShowDetailsBtn',
				default: (answers) => languages[answers.language].strings.ShowDetailsBtn,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ClickNext',
				message: 'ClickNext',
				default: (answers) => languages[answers.language].strings.ClickNext,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ClickInstall',
				message: 'ClickInstall',
				default: (answers) => languages[answers.language].strings.ClickInstall,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ClickUninstall',
				message: 'ClickUninstall',
				default: (answers) => languages[answers.language].strings.ClickUninstall,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Name',
				message: 'Name',
				default: (answers) => languages[answers.language].strings.Name,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Completed',
				message: 'Completed',
				default: (answers) => languages[answers.language].strings.Completed,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'LicenseText',
				message: 'LicenseText',
				default: (answers) => languages[answers.language].strings.LicenseText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'LicenseTextCB',
				message: 'LicenseTextCB',
				default: (answers) => languages[answers.language].strings.LicenseTextCB,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'LicenseTextRB',
				message: 'LicenseTextRB',
				default: (answers) => languages[answers.language].strings.LicenseTextRB,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnLicenseText',
				message: 'UnLicenseText',
				default: (answers) => languages[answers.language].strings.UnLicenseText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnLicenseTextCB',
				message: 'UnLicenseTextCB',
				default: (answers) => languages[answers.language].strings.UnLicenseTextCB,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnLicenseTextRB',
				message: 'UnLicenseTextRB',
				default: (answers) => languages[answers.language].strings.UnLicenseTextRB,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Custom',
				message: 'Custom',
				default: (answers) => languages[answers.language].strings.Custom,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ComponentsText',
				message: 'ComponentsText',
				default: (answers) => languages[answers.language].strings.ComponentsText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ComponentsSubText1',
				message: 'ComponentsSubText1',
				default: (answers) => languages[answers.language].strings.ComponentsSubText1,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ComponentsSubText2_NoInstTypes',
				message: 'ComponentsSubText2_NoInstTypes',
				default: (answers) => languages[answers.language].strings.ComponentsSubText2_NoInstTypes,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ComponentsSubText2',
				message: 'ComponentsSubText2',
				default: (answers) => languages[answers.language].strings.ComponentsSubText2,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnComponentsText',
				message: 'UnComponentsText',
				default: (answers) => languages[answers.language].strings.UnComponentsText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnComponentsSubText1',
				message: 'UnComponentsSubText1',
				default: (answers) => languages[answers.language].strings.UnComponentsSubText1,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnComponentsSubText2_NoInstTypes',
				message: 'UnComponentsSubText2_NoInstTypes',
				default: (answers) => languages[answers.language].strings.UnComponentsSubText2_NoInstTypes,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnComponentsSubText2',
				message: 'UnComponentsSubText2',
				default: (answers) => languages[answers.language].strings.UnComponentsSubText2,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DirText',
				message: 'DirText',
				default: (answers) => languages[answers.language].strings.DirText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DirSubText',
				message: 'DirSubText',
				default: (answers) => languages[answers.language].strings.DirSubText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DirBrowseText',
				message: 'DirBrowseText',
				default: (answers) => languages[answers.language].strings.DirBrowseText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnDirText',
				message: 'UnDirText',
				default: (answers) => languages[answers.language].strings.UnDirText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnDirSubText',
				message: 'UnDirSubText',
				default: (answers) => languages[answers.language].strings.UnDirSubText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UnDirBrowseText',
				message: 'UnDirBrowseText',
				default: (answers) => languages[answers.language].strings.UnDirBrowseText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'SpaceAvailable',
				message: 'SpaceAvailable',
				default: (answers) => languages[answers.language].strings.SpaceAvailable,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'SpaceRequired',
				message: 'SpaceRequired',
				default: (answers) => languages[answers.language].strings.SpaceRequired,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UninstallingText',
				message: 'UninstallingText',
				default: (answers) => languages[answers.language].strings.UninstallingText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'UninstallingSubText',
				message: 'UninstallingSubText',
				default: (answers) => languages[answers.language].strings.UninstallingSubText,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'FileError',
				message: 'FileError',
				default: (answers) => languages[answers.language].strings.FileError,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'FileError_NoIgnore',
				message: 'FileError_NoIgnore',
				default: (answers) => languages[answers.language].strings.FileError_NoIgnore,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CantWrite',
				message: 'CantWrite',
				default: (answers) => languages[answers.language].strings.CantWrite,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CopyFailed',
				message: 'CopyFailed',
				default: (answers) => languages[answers.language].strings.CopyFailed,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CopyTo',
				message: 'CopyTo',
				default: (answers) => languages[answers.language].strings.CopyTo,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Registering',
				message: 'Registering',
				default: (answers) => languages[answers.language].strings.Registering,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Unregistering',
				message: 'Unregistering',
				default: (answers) => languages[answers.language].strings.Unregistering,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'SymbolNotFound',
				message: 'SymbolNotFound',
				default: (answers) => languages[answers.language].strings.SymbolNotFound,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CouldNotLoad',
				message: 'CouldNotLoad',
				default: (answers) => languages[answers.language].strings.CouldNotLoad,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CreateFolder',
				message: 'CreateFolder',
				default: (answers) => languages[answers.language].strings.CreateFolder,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CreateShortcut',
				message: 'CreateShortcut',
				default: (answers) => languages[answers.language].strings.CreateShortcut,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CreatedUninstaller',
				message: 'CreatedUninstaller',
				default: (answers) => languages[answers.language].strings.CreatedUninstaller,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Delete',
				message: 'Delete',
				default: (answers) => languages[answers.language].strings.Delete,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'DeleteOnReboot',
				message: 'DeleteOnReboot',
				default: (answers) => languages[answers.language].strings.DeleteOnReboot,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ErrorCreatingShortcut',
				message: 'ErrorCreatingShortcut',
				default: (answers) => languages[answers.language].strings.ErrorCreatingShortcut,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ErrorCreating',
				message: 'ErrorCreating',
				default: (answers) => languages[answers.language].strings.ErrorCreating,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ErrorDecompressing',
				message: 'ErrorDecompressing',
				default: (answers) => languages[answers.language].strings.ErrorDecompressing,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ErrorRegistering',
				message: 'ErrorRegistering',
				default: (answers) => languages[answers.language].strings.ErrorRegistering,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ExecShell',
				message: 'ExecShell',
				default: (answers) => languages[answers.language].strings.ExecShell,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Exec',
				message: 'Exec',
				default: (answers) => languages[answers.language].strings.Exec,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Extract',
				message: 'Extract',
				default: (answers) => languages[answers.language].strings.Extract,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'ErrorWriting',
				message: 'ErrorWriting',
				default: (answers) => languages[answers.language].strings.ErrorWriting,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'InvalidOpcode',
				message: 'InvalidOpcode',
				default: (answers) => languages[answers.language].strings.InvalidOpcode,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'NoOLE',
				message: 'NoOLE',
				default: (answers) => languages[answers.language].strings.NoOLE,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'OutputFolder',
				message: 'OutputFolder',
				default: (answers) => languages[answers.language].strings.OutputFolder,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'RemoveFolder',
				message: 'RemoveFolder',
				default: (answers) => languages[answers.language].strings.RemoveFolder,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'RenameOnReboot',
				message: 'RenameOnReboot',
				default: (answers) => languages[answers.language].strings.RenameOnReboot,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Rename',
				message: 'Rename',
				default: (answers) => languages[answers.language].strings.Rename,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Skipped',
				message: 'Skipped',
				default: (answers) => languages[answers.language].strings.Skipped,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'CopyDetails',
				message: 'CopyDetails',
				default: (answers) => languages[answers.language].strings.CopyDetails,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'LogInstall',
				message: 'LogInstall',
				default: (answers) => languages[answers.language].strings.LogInstall,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Byte',
				message: 'Byte',
				default: (answers) => languages[answers.language].strings.Byte,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Kilo',
				message: 'Kilo',
				default: (answers) => languages[answers.language].strings.Kilo,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Mega',
				message: 'Mega',
				default: (answers) => languages[answers.language].strings.Mega,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
			{
				name: 'Giga',
				message: 'Giga',
				default: (answers) => languages[answers.language].strings.Giga,
				when: (answers) => answers.translateStrings,
				store: this.storeStrings,
			},
		]);

		this.answers = answers;
	}

	writing() {
		this.answers.name = pascalCase(this.answers.name);
		this.answers.rtl = this.answers.rtl ? 'RTL' : false;

		this.fs.copyTpl(
			this.templatePath('template.nlf.eta'),
			this.destinationPath(`${this.answers.name}.nlf`),
			this.answers,
		);
	}
}
