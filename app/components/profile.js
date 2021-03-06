import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { FEATURES } from '../helpers/constants';
import { setupDataListener } from '../helpers/firebase-helper';

const Profile = ({ user, navigation }) => {
  const [userSales, setUsersSales] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setupDataListener((data) => filterData(data), FEATURES.GARAGE_SALES)
  }, []);

  const filterData = (data) => {
    if (data) {
      const fileredData = data.filter(x => x.user === user.email);

      setUsersSales(fileredData);
      setIsLoading(false);
    }    
  }

  const RenderSale = (index, sale) => {
    return (
      <TouchableHighlight 
        style={styles.listItem}
        key={index}
        onPress={() => navigation.push('ViewGarageSale', { sale: sale })}
      >
        <View>
          <Text>Title: {sale.title}</Text>
          <Text>Start: {sale.startDate}</Text>
          <Text>End: {sale.endDate}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      
      {
        userSales !== undefined && userSales.length > 0 ?
          <View>
            <Text>Previous Sales:</Text>
            <FlatList 
              style={styles.list}
              data={userSales}
              renderItem={({index, item}) => RenderSale(index, item)}
              keyExtractor={item => item.id} />
          </View>
        :
          isLoading === true ? 
            <ActivityIndicator size="large" color="#0000ff" /> 
          :
            <Text>No previous sales</Text>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 8
  },
  list: {
    marginTop: 8,
    marginBottom: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});

export default Profile;
