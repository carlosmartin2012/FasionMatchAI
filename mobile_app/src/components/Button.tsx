import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    onPress: () => void;
    title: string;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    loading = false,
    disabled = false,
    style,
    textStyle,
    variant = 'primary'
}) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                isPrimary && styles.primaryButton,
                isOutline && styles.outlineButton,
                disabled && styles.disabledButton,
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#fff' : '#000'} size="small" />
            ) : (
                <Text style={[
                    styles.text,
                    isPrimary ? styles.primaryText : styles.outlineText,
                    textStyle
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primaryButton: {
        backgroundColor: '#000',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    disabledButton: {
        backgroundColor: '#9ca3af',
        borderColor: '#9ca3af',
    },
    text: {
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 1,
    },
    primaryText: {
        color: '#fff',
    },
    outlineText: {
        color: '#000',
    },
});
