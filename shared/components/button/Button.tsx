
import styles from './button.module.css';
import Image from 'next/image';
type ButtonType = 'Primary' | 'Secondary' | 'Tertiary' | 'Danger' | 'Success' | 'Warning' | 'Info' | 'Light' | 'Dark' | 'Link' | 'Text' | 'Google' | 'None';

import React from 'react';

type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
    type: ButtonType;
    disabled?: boolean;
};

export default function Button({ text, onClick, className, type, disabled }: ButtonProps) {
    if (type === 'Google') {
        return (
            <button onClick={onClick} className={`${className} ${styles[type]} ${disabled ? styles.disabled : null} ${styles.Button}`}>
                <Image src="/images/googlelogo.png" alt="Google Logo" width={35} height={20}  />
                {text}
            </button>
        );
    }
    return (
        <a onClick={onClick} className={`${className} ${styles[type]} ${disabled ? styles.disabled : null} ${styles.Button}`}>
            {text}
        </a>
    );
}
