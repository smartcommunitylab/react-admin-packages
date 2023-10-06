import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import {
    Form,
    useTranslate,
    useLogin,
    useNotify,
    useSafeSetState,
} from 'react-admin';

import { LoginButton, LoginButtonProps } from './LoginButton';

/**
 * Default login form with text and button
 */

export const LoginForm = (props: LoginFormProps) => {
    const { title = 'ra.auth.auth_check_error', ...rest } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const login = useLogin();
    const notify = useNotify();

    const submit = () => {
        setLoading(true);
        login({})
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);

                //display error messages via notify
                const message =
                    typeof error === 'string' ? error : 'ra.auth.sign_in_error';
                notify(message, { type: 'error' });
            });
    };

    return (
        <Form onSubmit={submit} mode="onChange" noValidate>
            <CardContent>
                <Typography component="p" textAlign="center">
                    {title && typeof title === 'string'
                        ? translate(title)
                        : title}
                </Typography>
                <LoginButton type="submit" isLoading={loading} {...rest} />
            </CardContent>
        </Form>
    );
};

export type LoginFormProps = LoginButtonProps & {
    title?: string | React.ReactElement;
};
