import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

import { UsersService } from 'src/core/service/users.service';

export interface UserFieldConfig {
    name: string;
    value: string | boolean;
    validators?: any[];
}

export interface KeycloakUser {
    id?: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    confirmPassword: string;
    enabled?: boolean;
    emailVerified?: boolean;
    // etc...
}

export type CreateUserForm = KeycloakUser & { password: string };

@Component({
    selector: 'app-add-user',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './add-user.component.html',
})
export class AddUserComponnent {
    private usersService = inject(UsersService);
    private router = inject(Router);
    private toastr = inject(ToastrService);

    userFields = [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            value: 'test-ui-',
            placeholder: '',
            validators: [Validators.required],
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            value: '!Q2w3e4r',
            placeholder: '',
            validators: [Validators.required],
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            value: '!Q2w3e4r',
            placeholder: '',
            validators: [Validators.required],
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            value: 'test-ui-@test.net',
            placeholder: '',
            validators: [Validators.required, Validators.email],
        },
        {
            name: 'firstName',
            label: 'First Name',
            value: 'First test-',
            type: 'text',
            placeholder: '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            value: 'Last test-',
            type: 'text',
            placeholder: '',
        },
        { name: 'enabled', label: 'Enabled', value: true, type: 'checkbox' },
    ];

    public userForm = new FormGroup(
        Object.fromEntries(
            this.userFields.map((field) => [
                field.name,
                new FormControl(field.value, field.validators ?? []),
            ]),
        ),
    );

    async createUser(form: Partial<CreateUserForm>) {
        await firstValueFrom(this.usersService.addNewUser(form));
        await firstValueFrom(
            this.toastr.success('New User has been added!').onHidden,
        );

        void this.router.navigate(['/users']);
        console.log('user id from service: ', this.usersService.userId());
    }
}
