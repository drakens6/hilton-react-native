import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import HomeScreen from './Homescreen';
import DetailsScreen from './Details';
import NewScreen from './New';

const client = new ApolloClient({uri: 'http://10.0.0.136:8000/graphql'});
const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  New: NewScreen
},
{
  initialRouteName: 'Home',
});

const RootApp = createAppContainer(RootStack)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <RootApp />
      </ApolloProvider>
    );
  }
}
