import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { FEATURES } from '../helpers/constants';
import { setupDataListener } from '../helpers/firebase-helper';

const Profile = ({ user, navigation }) => {
  const [userSales, setUsersSales] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Load all of this person's garage sale history into a list view

  useEffect(() => {
    setupDataListener((data) => filterData(data), FEATURES.GARAGE_SALES)
  }, []);

  const filterData = (data) => {
    if (data) {
      const fileredData = data.filter(x => x.user === user.email);

      console.log(fileredData);

      setUsersSales(fileredData);
      setIsLoading(false);
    }    
  }

  const RenderSale = (index, sale) => {
    return (
      <TouchableHighlight style={styles.listItem} key={index} onPress={() => navigation.push('ViewGarageSale', { sale: sale })}>
        <Text>{sale.title}</Text>
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
              style={{marginTop: 8}}
              data={userSales}
              renderItem={({index, item}) => RenderSale(index, item)}
              keyExtractor={item => item.id} />
          </View>
        :
          isLoading === true ? 
            <ActivityIndicator size="large" /> 
          :
            <Text>No previous sales</Text>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 8
  }
});

export default Profile;
