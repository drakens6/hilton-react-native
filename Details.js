import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    headerRight: (
      <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Home"
        color="#fff"
      />
    )
  };
  
  constructor(props){
    super(props)
    this.RESERVATION_QUERY = gql`
    query Reservation($id: ID!){
      reservation(id: $id) {
        name
        hotelName
        departureDate
        arrivalDate
      }
    }
  `
  }
  render() {
    console.log(this.props.navigation.getParam('id'))
    return (
      <Query query={this.RESERVATION_QUERY} variables={{id: this.props.navigation.getParam('id').toString()}}>
      {({ data }) => {
          return (
        <View style={styles.container}>
          {data && data.reservation &&
          <View>
          <Text>Reservation Details</Text>
          <Text>Name: {data.reservation.name}</Text>
          <Text>Hotel Name: {data.reservation.hotelName}</Text>
          <Text>Arrival Date: {data.reservation.arrivalDate}</Text>
          <Text>Departure Date: {data.reservation.departureDate}</Text>
          </View>
          }
        </View>
          )}}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
