'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { VariantProps } from 'class-variance-authority';

import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
  type ThemeSelection,
  type Resolved,
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';
import { cn } from '@/lib/utils';
import { Sun } from '@/components/animate-ui/icons/sun';
import { MoonStar } from '@/components/animate-ui/icons/moon-star';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

const getIcon = (resolved: Resolved) => {
  return resolved === 'dark' ? (
    <AnimateIcon animateOnHover>
      <MoonStar />
    </AnimateIcon>
  ) : (
    <AnimateIcon animateOnHover>
      <Sun />
    </AnimateIcon>
  );
};

const getNextTheme = (
  currentTheme: ThemeSelection,
): ThemeSelection => {
  return currentTheme === 'light' ? 'dark' : 'light';
};

type ThemeTogglerButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
    direction?: ThemeTogglerPrimitiveProps['direction'];
  };

function ThemeTogglerButton({
  variant = 'default',
  size = 'default',
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Only allow light and dark themes
  const currentTheme = (theme === 'system' ? 'light' : theme) as 'light' | 'dark';

  return (
    <ThemeTogglerPrimitive
      theme={currentTheme}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={(newTheme) => {
        // Ensure we only set light or dark
        const themeToSet = newTheme === 'system' ? 'light' : newTheme;
        setTheme(themeToSet);
      }}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ resolved, toggleTheme }) => (
        <button
          data-slot="theme-toggler-button"
          className={cn(buttonVariants({ variant, size, className }), 'shadow-none')}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(currentTheme));
          }}
          {...props}
        >
          {getIcon(resolved)}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
