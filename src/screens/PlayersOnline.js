import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import axios from 'axios';

import maintibiaimg from '../assets/images/Tibia_icon.png';
// import PlayerInfo from './PlayerInfo.js';

let variateColors = ['#d4c0a1', '#f1e0c6'];

const PlayersOnline = () => {
  const [players, setPlayers] = useState([]);
  const [worldData, setWorldData] = useState([]);
  const [thisPlayer, setThisPlayer] = useState([]);
  const [dataPlayer, setDataPlayer] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const thisWorld = useRoute().params.world.name;

  const urlWorld = `https://api.tibiadata.com/v2/world/${thisWorld}.json`;

  useEffect(() => {
    getPlayerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlayerList = () => {
    axios
      .get(`${urlWorld}`)
      .then((response) => {
        setWorldData(response.data.world.world_information);
        setPlayers(response.data.world.players_online);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const fetchPlayerInfo = () => {
    axios
      .get(`https://api.tibiadata.com/v2/characters/${thisPlayer}.json`)
      .then((response) => {
        setDataPlayer(response.data.characters.data);
      });
  };

  const renderItemComponent = ({item, index}) => {
    return (
      <View>
        <Pressable
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
          onPressIn={() => {
            setThisPlayer(item.name);
          }}
          onPressOut={async () => {
            await fetchPlayerInfo();
            setIsModalVisible(!isModalVisible);
          }}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text>Level: {item.level}</Text>
          <Text>Vocation: {item.vocation}</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}>
          <View>
            <View style={styles.modalView}>
              <Text style={{fontWeight: 'bold'}}>{dataPlayer.name + '\n'}</Text>
              <Text>Level: {dataPlayer.level}</Text>
              {dataPlayer.guild === undefined ? (
                <Text>Guild: Doesn't have guild</Text>
              ) : (
                <Text>Guild: {dataPlayer.guild.name}</Text>
              )}
              <Text>Vocation: {dataPlayer.vocation}</Text>
              <Text>Residence: {dataPlayer.residence}</Text>
              <Text>
                Account Status: {dataPlayer.account_status + '\n' + '\n'}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={{fontWeight: 'bold'}}>Hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <View style={{top: 30}}>
      <View style={styles.imageBox}>
        <Image style={styles.imageMain} source={maintibiaimg} />
        <Text style={styles.textLayout}>{thisWorld}</Text>
        <View style={styles.worldInfo}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Players Online: {worldData.players_online}
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Game World Type: {worldData['Game World Type:']}
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Creation Date: {worldData.creation_date}
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Location: {worldData.location}
          </Text>
        </View>
      </View>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name.toString()}
        renderItem={renderItemComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  worldInfo: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 0,
    bottom: 0,
    fontSize: 40,
  },
  textLayout: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Redressed-Regular',
    fontSize: 40,
  },
  imageBox: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#DAA520',
    borderRadius: 5,
    backgroundColor: 'rgb(13, 46, 43)',
    width: '100%',
    height: 150,
  },
  imageMain: {
    resizeMode: 'contain',
    left: 100,
    flex: 1,
    width: null,
    height: null,
  },
  modalView: {
    marginTop: 192,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: '#20232a',
    borderRadius: 5,
    backgroundColor: '#fefae0',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#edf6f9',
    borderColor: '#006d77',
    borderWidth: 3,
  },
});

export default PlayersOnline;
