import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Homescreen';
import DetailsScreen from './Details';
import NewScreen from './New';

const client = new ApolloClient({uri: 'http://10.0.0.202:8000/graphql'});
const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  New: NewScreen
},
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <RootStack />
      </ApolloProvider>
    );
  }
}
