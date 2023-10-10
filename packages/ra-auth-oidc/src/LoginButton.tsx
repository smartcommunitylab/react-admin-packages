import * as React from 'react';

import { Button, CircularProgress } from '@mui/material';
import {
    LoginFormClasses,
    useLogin,
    useNotify,
    useSafeSetState,
    useTranslate,
} from 'react-admin';
import LoginIcon from '@mui/icons-material/Login';

/**
 * A login button which will invoke authProvider.login with no parameters
 */
export const LoginButton = (props: LoginButtonProps) => {
    const {
        type = 'button',
        label = 'ra.auth.sign_in',
        icon = <LoginIcon />,
        isLoading,
    } = props;
    //hook for translation
    const translate = useTranslate();
    //hook from auth provider
    const login = useLogin();
    //keep state for loading indicator
    const [loading, setLoading] = useSafeSetState(false);
    //notify errors
    const notify = useNotify();

    const isButton = type === 'button';
    const showLoading = isLoading || loading;

    const handleClick = () => {
        if (isButton) {
            //execute action locally
            setLoading(true);
            login({})
                .then(() => {
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);

                    //display error messages via notify
                    const message =
                        typeof error === 'string'
                            ? error
                            : 'ra.auth.sign_in_error';
                    notify(message, { type: 'error' });
                });
        }
    };

    const startIcon = showLoading ? (
        <CircularProgress
            className={LoginFormClasses.icon}
            size={19}
            thickness={3}
        />
    ) : (
        icon
    );

    return (
        <Button
            variant="contained"
            type={type}
            color="primary"
            disabled={showLoading}
            fullWidth={!isButton}
            className={LoginFormClasses.button}
            sx={{ mt: 2 }}
            onClick={() => handleClick()}
            startIcon={startIcon}
        >
            {translate(label)}
        </Button>
    );
};

export type LoginButtonProps = {
    label?: string;
    icon?: React.ReactElement;
    type?: 'submit' | 'button' | undefined;
    isLoading?: boolean;
};
