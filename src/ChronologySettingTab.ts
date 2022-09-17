
import { App, PluginSettingTab, Setting } from "obsidian";
import ChronologyPlugin from "./main";

export class ChronologySettingTab extends PluginSettingTab {
	plugin: ChronologyPlugin;

	constructor(app: App, plugin: ChronologyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Chronology Settings'});

		this.createToggle(containerEl, "Add Ribbon Icon",
            "Adds an icon to the ribbon to launch scan",
            "addRibbonIcon"
        );

        this.createToggle(containerEl, "Open on start up",
            "Opens the chronology sidebar when Obsidian starts.",
            "launchOnStartup"
        );

        this.createToggle(containerEl, "24 hours display",
        "Uses 24 hours display mode in timeline",
        "use24Hours"
        );

        new Setting(this.containerEl)
            .setName("Average Daily Notes")
            .setDesc("Used to display the daily indicator in the calendar")
            .addText(cb=>{
                cb
                .setValue(this.plugin.settings.avgDailyNotes ? this.plugin.settings.avgDailyNotes.toString() : "")
                .onChange(async (value)=>{
                    this.plugin.settings.avgDailyNotes = Number(value);
                    await this.plugin.saveSettings();
					// this.display();
                })
                
            })
	}


    private createToggle(containerEl: HTMLElement, name: string, desc: string, prop: string) {
		new Setting(containerEl)
			.setName(name)
			.setDesc(desc)
			.addToggle(bool => bool
				.setValue((this.plugin.settings as any)[prop] as boolean)
				.onChange(async (value) => {
					(this.plugin.settings as any)[prop] = value;
					await this.plugin.saveSettings();
					this.display();
				})
			);
	}
}
