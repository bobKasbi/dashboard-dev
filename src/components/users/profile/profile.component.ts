import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from 'src/core/service/config.service';

interface UserProfile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
}

type UserProfileForm = {
    id: FormControl<string>;
    username: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    emailVerified: FormControl<boolean>;
    enabled: FormControl<boolean>;
};

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [JsonPipe, MatProgressSpinnerModule, ReactiveFormsModule],
})
export class ProfileComponent {
    private configService = inject(ConfigService);

    readonly formFields: readonly {
        name: keyof UserProfile;
        label: string;
        type: 'text' | 'checkbox';
        value?: string | boolean;
        placeholder?: string;
    }[] = [
        { name: 'id', label: 'ID', type: 'text', value: '', placeholder: '' },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            value: '',
            placeholder: '',
        },
        {
            name: 'firstName',
            label: 'Firstname',
            type: 'text',
            value: '',
            placeholder: '',
        },
        {
            name: 'lastName',
            label: 'Lastname',
            type: 'text',
            value: '',
            placeholder: '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            value: '',
            placeholder: '',
        },
        {
            name: 'emailVerified',
            label: 'Email Verified',
            type: 'checkbox',
            value: false,
        },
        { name: 'enabled', label: 'Enabled', type: 'checkbox', value: false },
    ];

    // With withComponentInputBinding() Angular must be able to write to the field.
    // we cannot make id private, Angular cannot bind the route param to it.
    id = input<string>();

    userResource = httpResource<UserProfile>(() => {
        const id = this.id();
        const apiBaseUrl = this.configService.config()?.apiBaseUrl;
        if (!id) throw new Error('No user id');
        if (!apiBaseUrl) return undefined;
        return {
            url: `${apiBaseUrl}/users/${id}`,
            method: 'GET',
        };
    });

    readonly profileForm = computed<FormGroup<UserProfileForm> | null>(() => {
        const user = this.userResource.value();
        if (!user) {
            return null;
        }

        return new FormGroup(
            Object.fromEntries(
                this.formFields.map((field) => [
                    field.name,
                    new FormControl(user[field.name], { nonNullable: true }),
                ]),
            ) as UserProfileForm,
        );
    });
}
