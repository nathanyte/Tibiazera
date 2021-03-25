import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';

import maintibiaimg from '../assets/images/Tibia_icon.png';
import tibialogoimg from '../assets/images/Tibia_Logo.png';

let variateColors = ['#d4c0a1', '#f1e0c6'];

const WorldList = () => {
  const {navigate} = useNavigation();

  const [worlds, getWorlds] = useState([]);

  const url = 'https://api.tibiadata.com/v2/worlds.json';

  useEffect(() => {
    getWorldList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWorldList = () => {
    axios
      .get(`${url}`)
      .then((response) => {
        getWorlds(response.data.worlds.allworlds);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const renderItemComponent = ({item, index}) => (
    <TouchableOpacity
      style={{
        marginTop: 1.5,
        paddingVertical: 10,
        borderWidth: 3,
        borderColor: '#20232a',
        borderRadius: 5,
        backgroundColor: variateColors[index % variateColors.length],
        alignItems: 'center',
        width: '100%',
      }}
      onPress={() => navigate('PlayersOnline', {world: item})}>
      <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      <Text>Players online: {item.online}</Text>
      <Text>Location: {item.location}</Text>
      <Text>WorldType: {item.worldtype}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{top: 30}}>
      <View style={styles.imageBox}>
        <Image style={styles.imageMain} source={tibialogoimg} />
        <Image style={styles.imageMain} source={maintibiaimg} />
      </View>
      <FlatList
        data={worlds}
        keyExtractor={(item) => item.name.toString()}
        renderItem={renderItemComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  imageBox: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#DAA520',
    borderRadius: 5,
    backgroundColor: 'rgb(13, 46, 43)',
    width: '100%',
    height: 150,
    flexDirection: 'row',
  },
  imageMain: {
    resizeMode: 'contain',
    left: 15,
    flex: 1,
    width: null,
    height: null,
  },
  imageLogo: {
    resizeMode: 'contain',
    flex: 1,
    top: 50,
    width: null,
    height: null,
  },
  worldBox: {
    marginTop: 20,
    paddingVertical: 8,
    borderWidth: 3,
    borderColor: '#20232a',
    borderRadius: 5,
    backgroundColor: '#1ca',
    alignItems: 'center',
    width: '100%',
  },
});

export default WorldList;
