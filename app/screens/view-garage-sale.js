import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ViewGarageSale = ({ navigation, route }) => {
  const [sale, setSale] = useState();

  useEffect(() => {
    // Setup Navigation
		navigation.setOptions({
			headerTitle: 'Sale Details',
			headerTitleAlign: 'center'
		});
  }, []);

  useEffect(() => {
    if (route.param?.sale) {
      setSale(route.param.sale);
    }

  }, [route.param?.sale])

  return (
    <View>
      <Text>View Garage Sale</Text>
    </View>
  )
};

const styles = StyleSheet.create({

});

export default ViewGarageSale;