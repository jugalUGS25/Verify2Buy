import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../theme';
import Icon from 'react-native-vector-icons/Feather'; // Or use Lottie for animated icons

const HomeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const benefits = [
    {
      icon: 'search',
      title: 'Quick Scanning',
      description: 'Check product authenticity in seconds.',
    },
    {
      icon: 'check-circle',
      title: 'Genuine Products',
      description: 'Confirm items are real, and buy with confidence.',
    },
    {
      icon: 'alert-triangle',
      title: 'Counterfeit Protection',
      description: 'Avoid harmful food items.',
    },
    {
      icon: 'shield',
      title: 'Build Trust',
      description: 'Shop confidently with new brands.',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome to Verify2Buy</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Scan. Trust. Buy with Confidence.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {benefits.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Icon name={item.icon} size={28} color={theme.colors.accent} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: theme.colors.textSecondary }]}>{item.description}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.surface }]}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
