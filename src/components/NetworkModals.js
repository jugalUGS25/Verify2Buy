import React from 'react';
import { Text } from 'react-native';
import Dialog from 'react-native-dialog';

export default function NetworkModals({
  responsefail,
  closeError,
  networkerror,
  networkError,
  networkslow,
  closenetworkslow,
}) {
  return (
    <>
      <Dialog.Container visible={responsefail}>
        <Dialog.Description>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            No product found
          </Text>
        </Dialog.Description>
        <Dialog.Button label="Close" onPress={closeError} />
      </Dialog.Container>
      <Dialog.Container visible={networkerror}>
        <Dialog.Description>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Network error
          </Text>
        </Dialog.Description>
        <Dialog.Button label="Close" onPress={networkError} />
      </Dialog.Container>
      <Dialog.Container visible={networkslow}>
        <Dialog.Description>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Slow network
          </Text>
        </Dialog.Description>
        <Dialog.Button label="Close" onPress={closenetworkslow} />
      </Dialog.Container>
    </>
  );
}
