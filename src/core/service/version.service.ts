import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VersionService {
    // ✅ Expose the version as a signal
    readonly version = signal(environment.version);
}
