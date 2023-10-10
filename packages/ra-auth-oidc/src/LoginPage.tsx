import * as React from 'react';
import { LoginForm, LoginFormProps } from './LoginForm';
import { Login } from 'react-admin';
/**
 * Default login page with form and button
 */
export const LoginPage = (props: LoginProps) => {
    const { backgroundColor = '#00023b', backgroundImage, ...rest } = props;

    const style = {
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage ? '' : 'none',
    };

    return (
        <Login backgroundImage={backgroundImage} sx={style}>
            <LoginForm {...rest} />
        </Login>
    );
};

export type LoginProps = LoginFormProps & {
    backgroundImage?: string;
    backgroundColor?: string;
};
