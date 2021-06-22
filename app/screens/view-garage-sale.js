import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Badge } from 'react-native-elements';
import { getBadges } from '../helpers/badge-helper';

const ViewGarageSale = ({ navigation, route }) => {
  const [sale, setSale] = useState();
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Setup Navigation
		navigation.setOptions({
			headerTitle: 'Sale Details',
			headerTitleAlign: 'center'
		});
  }, []);

  useEffect(() => {
    if (route.params?.sale) {
      setSale(route.params.sale);
      const test = getBadges(route.params.sale)
      console.log(test);
      // TODO: Look into icons instead of badges
      setBadges(test);
    }

  }, [route.params?.sale])

  return (
    <View>
      {
        sale ?
        <View>
          <Text>Title: {sale.title}</Text>
          <Text>Description: {sale.description}</Text>
          <Text>Address: {sale.address}</Text>
          {
            badges.map((item, index) => {
              <Badge key={index} value={item} status='primary' />
            })
          }
        </View> 
        :
        <ActivityIndicator size="large" color="#0000ff" />
      }

    </View>
  )
};

const styles = StyleSheet.create({

});

export default ViewGarageSale;