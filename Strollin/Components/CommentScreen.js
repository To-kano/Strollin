import React from 'react';
import {
  StyleSheet, View, FlatList, Text
} from 'react-native';
import Comment from './Comment';

function CommentScreen(props)  {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      pseudo: "Tony Yo",
      comment: 'Wow trop bien !',
      note: '5/5'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      pseudo: "Tony Hi",
      comment: 'Bon pour les week-end 4/5',
      note: '4/5'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      pseudo: "Tony Dark",
      comment: 'Pas mal',
      note: '3,5/5'
    },
  ];

    return (
        <View style={styles.container}>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 40 }}> Geek Route</Text>
            <FlatList
                    data={DATA}
                    contentContainerStyle={{ flexGrow: 0.1 }}
                    renderItem={({item}) => <Comment id={item.id} comment={item.comment} note={item.note} pseudo={item.pseudo}/>}
                    keyExtractor={(item) => item.id}
                />
          </View>
        </View>
    );
}

export default CommentScreen;

const styles = StyleSheet.create({
    back: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1
    },
    fill: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.9,
      width: '100%',
    },
    header: {
      backgroundColor: '#E67E22',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.1,
      width: '100%',
    },
    cont: {
      marginTop: '5%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.1,
      backgroundColor: '#FFC300',
      width: '90%',
      borderRadius: 20
    },
  });