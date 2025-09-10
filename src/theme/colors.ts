export type AppTheme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    card: string;
    border: string;
    primary: string;
    text: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#F9FAFB',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#2563EB',
    text: '#111827',
    accent: '#10B981',
    success: '#22C55E',
    warning: '#F97316',
    error: '#EF4444',
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#1F2937',
    card: '#111827',
    border: '#374151',
    primary: '#3B82F6',
    text: '#F9FAFB',
    accent: '#34D399',
    success: '#4ADE80',
    warning: '#FB923C',
    error: '#F87171',
  },
};


