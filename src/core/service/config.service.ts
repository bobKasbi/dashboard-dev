import { Injectable, computed, signal } from '@angular/core';
import { RuntimeConfig } from 'src/model/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    readonly #config = signal<RuntimeConfig | null>(null);

    readonly config = computed(() => this.#config());
    readonly customHeader = computed(() => this.#config()?.CUSTOM_HEADER);
    readonly bgColor = computed(() => this.#config()?.BG_COLOR);

    public async load(): Promise<void> {
        const response = await fetch(environment.configUrl);

        if (!response.ok) {
            throw new Error('Failed to load runtime config');
        }

        const config = (await response.json()) as RuntimeConfig;
        this.#config.set(config);
        console.log('this.#config: ', config);
    }
}
