import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StyleSheet, Text, View, Button } from 'react-native';

const RESERVATIONS_QUERY = gql`
query{
  reservations {
    id
    name
  }
}
`
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('New')}
        title="New Reservation"
        color="#000"
      />
    )
  }};
  render() {
    return (
      <Query query={RESERVATIONS_QUERY} pollInterval={100}>
      {({ data }) => {
          return (
        <View style={styles.container}>
          <Text>Reservations:</Text>
        {data && data.reservations && data.reservations.map(reservation => (
          <Button title={reservation.name} style={{color: 'blue'}} key={reservation.id}
            onPress={() => this.props.navigation.navigate('Details', {
            id: reservation.id,
            name: reservation.name
          })}></Button>
        ))}
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
    justifyContent: 'space-around'
  },
});
