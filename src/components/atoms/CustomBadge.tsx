import { Badge, BadgeText } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

interface CustomBadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  variant?: 'solid' | 'outline';
  action?: "muted" | "error" | "warning" | "success" | "info" | undefined;
  size?: 'sm' | 'md' | 'lg';
  borderRadius?: string;
  leftIcon?: ReactNode;
}

export const CustomBadge: React.FC<CustomBadgeProps> = ({
  text,
  bgColor,
  textColor,
  variant = 'solid',
  action,
  size = 'sm',
  borderRadius = '$full',
  leftIcon
}) => {
  return (
    <Badge
      bg={bgColor}
      variant={variant}
      action={action}
      size={size}
      borderRadius={borderRadius}
    >
      {leftIcon}
      <BadgeText color={textColor}>{text}</BadgeText>
    </Badge>
  );
};