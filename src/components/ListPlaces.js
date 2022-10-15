import React from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import StarRating from './StarRating';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

state = {
    markers: [
        {
            coordinate: {
                latitude: 37.4224938,
                longitude: -122.086922,
            },
            title: "Best Place",
            description: "This is the best place in Portland",
            image: Images[0],
        },
        {
            coordinate: {
                latitude: 37.4224938,
                longitude: -122.086922,
            },
            title: "Second Best Place",
            description: "This is the second best place in Portland",
            image: Images[1],
        },
        {
            coordinate: {
                latitude: 37.4224938,
                longitude: -122.086922,
            },
            title: "Third Best Place",
            description: "This is the third best place in Portland",
            image: Images[2],
        },
        {
            coordinate: {
                latitude: 37.4224938,
                longitude: -122.086922,
            },
            title: "Fourth Best Place",
            description: "This is the fourth best place in Portland",
            image: Images[3],
        },
    ],
    region: {
        latitude: 37.4224938,
        longitude: -122.086922,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    },
};

const ListPlaces = () => {
    return (
        <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
        //onScroll={Animated.event(
        //[
        //{
        // nativeEvent: {
        // contentOffset: {
        //   x: this.animation,
        //},
        //},
        //</Animatable.View>},
        //  ],
        //</View> { useNativeDriver: true }
        //  )}
        >
            {state.markers.map((marker, index) => (
                <View style={styles.card} key={index}>
                    <Image
                        source={marker.image}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>

                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                        <StarRating ratings={marker.rating} reviews={marker.reviews} />
                        <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={[styles.signIn, {
                                    borderColor: '#000',
                                    borderWidth: 1
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#000'
                                }]}>Traçar rota</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </Animated.ScrollView>
    );
};

export default ListPlaces;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    map: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 45,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    containerForm: {
        flex: 5,
        backgroundColor: '#FFFFFF',
        paddingStart: '1%',
        paddingTop: '7%',
        paddingEnd: '1%',
        height: '60%'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text2: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        marginTop: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSecond: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 2,
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    buttonIconSeparator: {
        backgroundColor: '#000000'
    },
    buttonImagemIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch'
    },
    buttonImagemIconStyle2: {
        margin: 10,
        height: 30,
        width: 30,
        resizeMode: 'stretch'
    },
    input: {
        height: 30,
        width: 320,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    cabecalho: {
        flexDirection: "row"
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})