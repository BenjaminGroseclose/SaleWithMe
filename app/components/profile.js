import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import { FEATURES } from '../helpers/constants';
import { setupDataListener } from '../helpers/firebase-helper';

const Profile = ({user, navigation}) => {
  const [userSales, setUsersSales] = useState();
  // TODO: Load all of this person's garage sale history into a list view

  useEffect(() => {
    setupDataListener((data) => setUsersSales(data), FEATURES.GARAGE_SALES)
  }, []);

  const RenderSale = (index, sale) => {
    return (
      <TouchableHighlight key={index} onPress={() => navigation.push('ViewGarageSale', { sale: sale })}>

      </TouchableHighlight>
    );
  };

  return (
    <View>
      <Text>{user.email}</Text>
      <FlatList 
        data={userSales}
        renderItem={({index, item}) => RenderSale(index, item)}
        keyExtractor={item => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Profile;
