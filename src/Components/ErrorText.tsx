import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  messages: String[];
}

const ErrorText = ({messages = []}: Props) => {
  const displayMessages = messages.filter(msg => msg !== undefined);

  return (
    <View style={styles.errorContainer}>
      {displayMessages.map((msg, i) => (
        <Text key={i} style={styles.errorText}>
          {msg}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#cc0011',
  },
});

export default ErrorText;
