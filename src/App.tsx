/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Back, Ilone, Ilthree, Iltwo, Next} from './images';

const DATA = [
  {
    id: 1,
    title: 'Let us take care of you',
    desc: 'We are here to take care of you with pleasure. besides that we will monitor your condition 24/Day',
    pic: Ilone,
    back: false,
    skipSingle: true,
  },
  {
    id: 2,
    title: 'Always use a mask',
    desc: 'always use a mask when you want to travel and keep your body immunity',
    pic: Iltwo,
    back: true,
    skip: true,
  },
  {
    id: 3,
    title: 'Work from home',
    desc: 'to avoid the spread of covid 19. you can do office work from home and always be close to your family',
    pic: Ilthree,
    back: true,
    skip: true,
  },
];

const {width, height} = Dimensions.get('screen');

interface IndicatorProps {
  scrollx: any;
}
const Indicator = (props: IndicatorProps) => {
  const {scrollx} = props;
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 30,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [1, 1.7, 1],
          extrapolate: 'clamp',
        });
        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={{
              height: 8,
              width: 15,
              borderRadius: 3,
              backgroundColor: '#6686D8',
              margin: 6,
              transform: [
                {
                  scaleX: scale,
                },
              ],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

const NextComponent = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image source={Next} />
    </TouchableOpacity>
  );
};

const App = () => {
  const scrollx = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={DATA}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                paddingHorizontal: 20,
              }}>
              <View>
                {item.skipSingle && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      width,
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: 'bold',
                      }}>
                      Skip
                    </Text>
                  </View>
                )}
                {item.back && item.skip && (
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width,
                      padding: 20,
                    }}>
                    <TouchableOpacity>
                      <Image source={Back} />
                    </TouchableOpacity>
                    {item.skip && (
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Skip
                      </Text>
                    )}
                  </Animated.View>
                )}
              </View>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.pic}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  width,
                  padding: 20,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#000',
                    marginBottom: 20,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'grey',
                    textAlign: 'center',
                    lineHeight: 28,
                    paddingHorizontal: 10,
                  }}>
                  {item.desc}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} />
      <NextComponent />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF8FF',
    alignItems: 'center',
  },
});
