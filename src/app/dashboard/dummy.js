import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import MapView from 'react-native-maps';

// Third Party Library
import { FlatListSlider } from 'react-native-flatlist-slider';
import { FlatGrid } from 'react-native-super-grid';

// Components
import LineSeperator from '../Components/LineSeperator';
import ItemDescriptionNavigationBar from '../Components/ItemDescriptionNavigationBar';
import ItemGridView from '../Components/ItemGridView';
// Dummy Data
import DummyData from '../DummyData/DummyData';



/**
 *
 * To show the the slider image, it will only work if the image are hosted on the server, but not on the local storage
 */
function SliderView({ imageData }) {
    return (
        <View style={styles.sliderView}>
            <FlatListSlider
                data={imageData}
                timer={5000}
                onPress={item => alert(JSON.stringify(item))}
                indicatorContainerStyle={{ position: 'absolute', bottom: 15 }}
                indicatorActiveColor={'rgb(14,127,201)'}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={7}
                animation
            >
         </FlatListSlider>
        </View>
    );
}


/**
 *
 * To show the attribute of the product, these data is passed from its paraent class
 */
function TitleView({ title, rating, reviewCount, dayPrice, weekPrice, monthPrice }) {
    return (
        <View style={styles.titleView}>
            <View style={{ padding: 25 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: 'rgba(184,34,70,1.0)' }}>{title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black' }}>{rating}</Text>
                    <Text style={{ color: 'rgba(184,34,70,1.0)' }}>  ★ </Text>
                    <Text style={{ color: 'black' }}>{'(' + reviewCount + ')'}</Text>
                </View>
                <View style={{ height: 90, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '900', color: 'rgba(90,90,90,1.0)' }}>{dayPrice + '€'}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(190,190,190,1.0)' }}>Day</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '900', color: 'rgba(90,90,90,1.0)' }}>{weekPrice + '€'}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(190,190,190,1.0)' }}>Week</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '900', color: 'rgba(90,90,90,1.0)' }}>{monthPrice + '€'}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(190,190,190,1.0)' }}>Month</Text>
                    </View>
                </View>
                <LineSeperator />
            </View>
        </View>
    );
}

/**
 *
 * To render the user details including rating, item it host and response time
 */
function UserDetailView({ imageURL, name, rating, reviewCount, responseTime, totolItemHolding }) {
    return (
        <View style={[styles.userDetailView]}>
            <View style={{ padding: 25, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Image style={{ width: 55, height: 55 }} source={require('../Images/camera.png')} />
                            <Image style={{ width: 20, height: 20, marginLeft: -15 }} source={require('../Images/userBottom.png')} />
                        </View>
                        <View style={{ paddingLeft: 10 }} >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'rgba(90,90,90,1.0)' }}>{name}</Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{'Normally respond in ' + responseTime + ' hour'}</Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{'+ ' + totolItemHolding + ' more items'}</Text>
                        </View>
                    </View>
                    <View >
                        <Text style={{ fontSize: 13, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{rating + ' ★ ' + '(' + reviewCount + ')'}</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 25 }}>
                <LineSeperator />
            </View>

        </View>
    );
}


/**
 *
 * Retrurn the heading of the container view
 */

function Heading({ title }) {
    return (
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'rgba(32,32,32,1.0)' }}>{title.toUpperCase()}</Text>
    );
}

/**
 * Shows the product description
 */
function ItemDescriptionView({ description }) {
    return (
        <View style={[styles.itemDescriptionView]}>
            <View style={{ padding: 25, width: '100%' }}>
                <Heading title='Description' />
                <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(90,90,90,1.0)', marginTop: 10 }}>{description}</Text>
            </View>
            <View style={{ paddingHorizontal: 25 }}>
                <LineSeperator />
            </View>
        </View>
    );
}

/**
 *
 * Shows the current location on map and distance from the logged in user
 */
function LocationView({ city, distance }) {
    return (
        <View style={[styles.locationView]}>
            <View style={{ padding: 25, width: '100%' }}>
                <Heading title='Location' />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{city}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{distance} Km from you </Text>
                </View>
                <View style={{ height: 250, backgroundColor: 'lightgray', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: '#FFF' }}>Map will render here.</Text>

                </View>
            </View>
            <View style={{ paddingHorizontal: 25 }}>
                <LineSeperator />
            </View>
        </View>
    );
}


/**
 * Shows the calender to change the availablity time/days
 */
function CalenderView({ returnDay }) {
    return (
        <View style={[styles.locationView]}>
            <View style={{ padding: 25, width: '100%' }}>
                <Heading title='Availability' />
            </View>
        </View>
    );
}

/**
 * Shows the other item from the same owner, 4 item will be display here, if owner has more item then user will see all the items by tapping on 'Show More' button
 */

function OtherItemView({ }) {
    return (
        <View style={[styles.locationView]}>
            <View style={{ padding: 25, width: '100%', }}>
                <Heading title='Other items of the owner' />
                <ItemGridView />
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(90,90,90,1.0)', marginTop: 0 }}>Show more </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


/**
 * Shows the comment of the item, there is a button on the bottom that will navigate to the new screen to show all the comment of the item
 */
function CommentView({ navigation, userName, date, rating, comment, imageURL }) {

    const navigateToTheScreen = () => {
        navigation.push('SubmitRatingScreen')
    }

    return (
        <View style={[styles.locationView]}>
            <View style={{ padding: 25, width: '100%' }}>
                <Heading title='Comment' />
                <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <Image style={{ marginTop: 5, width: 60, height: 60 }} source={require('../Images/camera.png')} />
                    <View style={{ paddingRight: 60, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, }}>
                            <Text style={{ fontSize: 22, fontWeight: '700', color: 'rgba(90,90,90,1.0)' }}>{userName}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(90,90,90,1.0)' }}>{date}</Text>
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: '400', color: 'rgba(184,34,70,1.0)', paddingVertical:6}}>★★★★★</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(90,90,90,1.0)', }}>{comment}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={navigateToTheScreen}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(90,90,90,1.0)', marginTop: 10 }}>Show other comments </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 25 }}>
                <LineSeperator />
            </View>
        </View>
    );
}

/**
 * Render edit item and availability button
 */
function ButtonView({ navigation }) {

    navigateToEditITemScreen = () => {
        navigation.push('EditItemScreen');
    }

    navigateAvilablityScreen = () => {
        navigation.push('AvailablityScreen');
    }

    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TouchableOpacity style={styles.secondaryButton} onPress={navigateToEditITemScreen}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(90,90,90,1.0)' }}>Edit Item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={navigateAvilablityScreen}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(90,90,90,1.0)' }}>Edit Availability</Text>
            </TouchableOpacity>
        </View>
    );
}

// Screen 15
class ItemDisplayScreen extends React.Component {

    // Button Action

    /**
     * To navigate to the 'Login' screen
     */
     constructor(props){
         super(props)
         this.state = ({
           data:{
             itemTitle:"test"
           },
           loading:false
         });
     }
    handleBackButtonAction() {
        this.props.navigation.pop()
    }
    componentDidMount() {

       this.getItemDetails().then((resolve) => {
           this.setState({ loading: false})
       }, (err) => {
           console.log(err)
       })
    }
    getItemDetails(){
      let params={};
      params.userID="1";
      params.itemID="38";
      params.latitude="";
      params.longitude="";
      // console.log("testsetsetsetsetestes");
      // console.log(params);
      return new Promise( (resolve, reject) => {
          fetch('https://contestcottage.com:5000/getItemDetails', {
          method: 'POST', // or 'PUT'
          headers: {
              'Content-Type': 'application/json',
          },
              body: JSON.stringify(params),
          })
          .then(response => response.json())
          .then(collection => {
            this.setState({data:collection.data});
              // resolve(collection.data);
          }).catch((error)=>{
              alert('error call ', error);
              reject(error);
          });
      })
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.background}>
                    <ItemDescriptionNavigationBar title="" onClickCallback={this.handleBackButtonAction.bind(this)} />
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }} contentInsetAdjustmentBehavior='automatic'>

                            <SliderView imageData={imageSldierData} >

                            </SliderView>
                            <TitleView title={this.state.data.itemTitle} rating={this.state.data.rating} reviewCount={this.state.data.reviewscount} dayPrice={this.state.data.perdayPrice} weekPrice={this.state.data.weekPrice} monthPrice={this.state.data.monthPrice} />
                            <UserDetailView imageURL={this.state.data.user_profile_photo} name={this.state.data.firstName+' '+this.state.data.lastName} rating={this.state.data.userratings} reviewCount={this.state.data.userreviewscount} responseTime='2' totolItemHolding='27' />
                            <ItemDescriptionView description={this.state.data.itemDescription} />
                            <LocationView city={this.state.data.location} distance={this.state.data.distance} />
                            <CalenderView returnDay='31' />
                            <CalendarList

                                // Callback which gets executed when visible months change in scroll view. Default = undefined
                                onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                                // Max amount of months allowed to scroll to the past. Default = 50
                                pastScrollRange={0}
                                // Max amount of months allowed to scroll to the future. Default = 50
                                futureScrollRange={0}
                                // Enable or disable scrolling of calendar list
                                scrollEnabled={true}
                                // Enable or disable vertical scroll indicator. Default = false
                                showScrollIndicator={true}
                                // Collection of dates that have to be colored in a special way. Default = {}
                                markedDates={{
                                    '2021-01-21': { selected: true, startingDay: true, color: 'rgb(210,37,80)' },
                                    '2021-01-22': { selected: true, endingDay: true, color: 'rgb(210,37,80)', textColor: 'white' },
                                }}
                                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                                markingType={'period'}
                            />

                            <View style={{ paddingHorizontal: 25 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgba(90,90,90,1.0)', marginTop: 10 }}>🔔 22 is the return day</Text>
                                <View style={{ width: 20, height: 20 }}></View>
                                <LineSeperator />
                            </View>
                            <OtherItemView />

                            <CommentView navigation={this.props.navigation} userName='Lucia San' date='13/06/2013' comment='I got my CMD-1500 and I have to say it’s a great convertor!! I bought it for my PAL Phillips Videopac G7400 (Odyssey3) Videogame system to play on my NTSC T.V. and it works awesome!!Peter and his helpful staff stands by their word, buy with confidence from World-Import if they don’t have it, you don’t need it!!! Christopher D., Westford Ma.
'/>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonView navigation={this.props.navigation} />
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

export default ItemDisplayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,1.0)',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1.0)',
    },
    scrollView: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,1.0)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
        height: 90
    },
    sliderView: {
        width: '100%',
        height: 230,
    },
    titleView: {
        width: '100%',
        height: 160,
        backgroundColor: '#FFF'
    },
    userDetailView: {
        width: '100%',
        height: 100,
    },
    itemDescriptionView: {
        width: '100%',
    },
    locationView: {
        width: '100%',
    },
    secondaryButton: {
        width: 140,
        height: 44,
        backgroundColor: 'rgba(255,255,255,1.0)',
        borderRadius: 22,
        borderWidth: 0.5,
        borderColor: 'rgba(220,220,220,1.0)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 8, height: 7, },
        shadowColor: 'rgba(127,127,127,1.0)',
        shadowOpacity: 0.3,
    },
});