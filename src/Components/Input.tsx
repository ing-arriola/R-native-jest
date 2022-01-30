import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  error: string | undefined;
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  testID: string;
}

const Input = ({
  error,
  label,
  secureTextEntry,
  onChangeText,
  testID,
}: Props) => {
  return (
    <View
      style={[
        styles.inputContainer,
        error ? styles.inputContainerError : null,
      ]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={onChangeText}
          testID={testID}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#f4f6f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#f4f6f8',
  },
  inputContainerError: {
    borderColor: '#cc0011',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 10,
    color: '#b4b6b8',
  },
  input: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
  errorContainer: {
    paddingVertical: 10,
  },
});

export default Input;
