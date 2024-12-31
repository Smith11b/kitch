
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
    style?: React.CSSProperties;
};

export default function Button({ text, onClick, className, type, disabled, style }: ButtonProps) {
    if (type === 'Google') {
        return (
            <button onClick={onClick} className={`${className} ${styles[type]} ${disabled ? styles.disabled : null} ${styles.Button}`}>
                <Image src="/images/googlelogo.png" alt="Google Logo" width={35} height={20}  />
                {text}
            </button>
        );
    }
    return (
        <button onClick={onClick} className={`${className} ${styles[type]} ${disabled ? styles.disabled : null} ${styles.Button}`} style={style}>
            {text}
        </button>
    );
}
