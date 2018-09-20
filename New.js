import React from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { StyleSheet, Text, View, Button } from 'react-native';
import t from 'tcomb-form-native'; 
const Form = t.form.Form;
const Reservation = t.struct({
  name: t.String,
  hotel: t.String,
  arriving: t.String,
  departing: t.String
});

const RESERVATIONS_QUERY = gql`
  mutation Reservation($name: String!, $arriving: String!, $departing: String!, $hotel: String!){
    reservation(name: $name, arrivalDate:$arriving, departureDate:$departing, hotelName:$hotel)
  }
`
export default class NewScreen extends React.Component {
  static navigationOptions = {
    title: 'New Reservation',
    headerRight: (
      <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Home"
        color="#fff"
      />
    )
  };
  
  handleSubmit = (mutate) => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    mutate({ variables: value}).then( () => {
      this.props.navigation.navigate('Home')
    })
  }
  render() {
    return (
      <Mutation mutation={RESERVATIONS_QUERY}>
      {(mutate) => {
          return (
        <View>
          <Text>Create a New Reservation</Text>
          <Form 
            ref={c => this._form = c} // assign a ref
            type={Reservation} 
          />
          <Button
          title="Create"
          onPress={() => {
            this.handleSubmit(mutate)
          }}
        />
        </View>
      )}}
      </Mutation>
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
