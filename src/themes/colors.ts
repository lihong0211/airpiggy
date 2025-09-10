/**
 * 颜色主题配置
 * 与 variable.css 中的 CSS 变量保持一致
 */
export const colors = {
  // 基础颜色
  white: '#ffffff',
  black: '#000000',
  blue: '#0564f1',
  grape: '#7214FF',
  orange: '#FF9F29',
  blueLight: '#00B3FF',

  // 灰色系
  grey: {
    900: '#111827',
    800: '#1F2937',
    700: '#374151',
    600: '#4B5563',
    500: '#6b7280',
    400: '#9ca3af',
    300: '#d1d5db',
    200: '#eeeff2',
    100: '#f3f4f6',
    50: '#f9fafb',
  },

  // 主色调
  primary: {
    600: '#F28C28', // var(--color-primary-600)
    500: '#F6A94C',
    400: '#F8BE74',
    300: '#FAD39C',
    200: '#FCE8C3',
    100: '#FFF4E5',
  },

  // 成功色
  success: {
    600: '#25D076',
    500: '#56E599',
    400: '#80EBB3',
    300: '#ABF2CC',
    200: '#D5F8E6',
    100: '#EAFCF2',
  },

  // 警告色
  warning: {
    600: '#fdc83d',
    500: '#FDD364',
    400: '#FEDE8B',
    300: '#FEE9B1',
    200: '#FFF4D8',
    100: '#fffaec',
  },

  // 错误色
  error: {
    600: '#FF445D',
    500: '#FF697D',
    400: '#FF8F9E',
    300: '#FFB4BE',
    200: '#FFDADF',
    100: '#FFF5F6',
  },

  // 次要色
  secondary: {
    600: '#01353B',
    500: '#345D62',
    400: '#678689',
    300: '#99AEB1',
    200: '#CCD7D8',
    100: '#E6EBEB',
  },

  // 中性色
  neutral: {
    7: '#8C8C8C',
  },
} as const;

// 导出常用的颜色别名，方便使用
export const themeColors = {
  primary: colors.primary[600],
  primaryLight: colors.primary[500],
  primaryDark: colors.primary[600],
  
  success: colors.success[600],
  warning: colors.warning[600],
  error: colors.error[600],
  
  text: {
    primary: colors.grey[900],
    secondary: colors.grey[600],
    disabled: colors.grey[400],
  },
  
  background: {
    primary: colors.white,
    secondary: colors.grey[50],
    disabled: colors.grey[100],
  },
  
  border: {
    primary: colors.grey[200],
    secondary: colors.grey[300],
  },
} as const;

export default colors;
