/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../src/AppNavigator', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function MockAppNavigator() {
    return <Text>Home</Text>;
  };
});

import App from '../App';

test('renders home screen', () => {
  const { getByText } = render(<App />);
  expect(getByText('Home')).toBeTruthy();
});

