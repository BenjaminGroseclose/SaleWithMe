import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { getSaleIcons } from '../helpers/icon-helper';

const ViewGarageSale = ({ navigation, route }) => {
  const [sale, setSale] = useState();
  const [icons, setIcons] = useState([]);

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
      setIcons(getSaleIcons(route.params.sale));
    }

  }, [route.params?.sale])

  return (
    <View style={styles.container}>
      {
        sale ?
        <View>
          <Text style={styles.text}>Title: {sale.title}</Text>
          <Text style={styles.text}>Description: {sale.description}</Text>
          <Text style={styles.text}>Address: {sale.address}</Text>
          <Text style={styles.text}>Catagories:</Text>
          {
            icons.map((item, index) => {
              return (
                <View key={index} style={styles.iconRow}>
                  <Icon size={30} iconStyle={{width: 150}} name={item.icon} type={item.type} />
                  <Text style={{fontSize: 18}}>{item.text}</Text>
                </View>
              )
            })
          }
          <Text style={styles.text}>Start: {sale.startDate}</Text>
          <Text style={styles.text}>End: {sale.endDate}</Text>
        </View> 
        :
        <ActivityIndicator size="large" color="#0000ff" />
      }

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderBottomWidth: 1
  },
  text: {
    fontSize: 18,
    marginTop: 8
  }
});

export default ViewGarageSale;