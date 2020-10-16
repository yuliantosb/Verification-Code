import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Tanzania from '../assets/tanzania.svg';
import Indonesia from '../assets/indonesia.svg';
import Usa from '../assets/usa.svg';
import {Fragment} from 'react';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  selectPhoneCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 2,
    marginBottom: 20,
    fontWeight: '500',
  },
  flag: {
    marginRight: 20,
  },
  textPhoneCode: {
    color: '#3a3a3a',
    fontSize: 16,
    paddingVertical: 20,
  },
});

export default function Dropdown() {
  const opacity = useRef(new Animated.Value(0)).current;

  const [options, setOptions] = useState({
    name: 'tanzania',
    text: 'Tanzania (+255)',
  });
  const Flag = ({width, height, name}) => {
    const flags = [
      {
        name: 'tanzania',
        flag: Tanzania,
      },
      {
        name: 'usa',
        flag: Usa,
      },
      {
        name: 'indonesia',
        flag: Indonesia,
      },
    ];

    const findFlag = flags.find((flag) => flag.name === name);

    return <findFlag.flag width={width} height={height} />;
  };
  const handleDropdown = (status) => {
    Animated.timing(opacity, {
      toValue: status ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleChangeFlag = (name, text) => {
    setOptions({
      name,
      text,
    });

    handleDropdown(false);
  };
  return (
    <Fragment>
      <Animated.View
        style={{
          position: 'absolute',
          borderRadius: 10,
          top: 130,
          left: 0,
          zIndex: 4,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 0.1,
          elevation: 1,
          width: width - 40,
          paddingTop: 20,
          opacity,
          height: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 60 * 3],
          }),
        }}>
        <FlatList
          data={[
            {
              id: '1',
              flag: Tanzania,
              name: 'tanzania',
              text: 'Tanzania (+255)',
            },
            {
              id: '2',
              flag: Usa,
              name: 'usa',
              text: 'United States (+1)',
            },
            {
              id: '3',
              flag: Indonesia,
              name: 'indonesia',
              text: 'Indonesia (+62)',
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleChangeFlag(item.name, item.text)}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  width: '100%',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                <View style={styles.flag}>
                  <item.flag width={30} height={30} />
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      color: '#3a3a3a',
                    }}>
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
      <View style={[styles.selectPhoneCode, {position: 'relative'}]}>
        <View style={styles.flag}>
          <Flag name={options.name} width={30} height={30} />
        </View>
        <View style={{width: width - 130}}>
          <TouchableOpacity onPress={() => handleDropdown(true)}>
            <Text style={styles.textPhoneCode}>{options.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}
