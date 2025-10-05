export const base = {
  primary600: '#2563EB',
  primary700: '#1D4ED8',
  primary50:  '#EFF6FF',

  accent500:  '#F59E0B',
  accent600:  '#D97706',

  gray900: '#0B1220',
  gray700: '#334155',
  gray600: '#475569',
  gray200: '#E5E7EB',
  gray300: '#ffffffff',
 gray50:  '#F8FAFC',
 


  success600: '#16A34A',
  warning600: '#D97706',
  danger600:  '#DC2626',

  blue100 :'#97cfe3'
};



export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: base.gray50,
    //card: '#FFFFFF',
     card: base.blue100,
    border: base.gray200,
    // text: base.gray900,
    text: base.gray300,
    muted: base.gray600,
    //primary: base.primary600,
     primary:'#3078a4',
    primaryPressed: base.primary700,
    // accent: base.accent500,
    accent: base.gray300,
    textSecondary: '#3078a4',
    surface:'#FFFFFF'
  }
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#0B1220',
    card: '#0F172A',
    border: '#1F2937',
    text: '#E2E8F0',
    muted: '#94A3B8',
     primary: base.primary600,
    primaryPressed: base.primary700,
    accent: base.accent500,
    textSecondary:'#E2E8F0'
  }
};

export type AppTheme = typeof lightTheme;
function gradient(arg0: any, arg1: any, arg2: number) {
  throw new Error("Function not implemented.");
}

