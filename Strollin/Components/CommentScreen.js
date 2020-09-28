import React from 'react';
import {
  StyleSheet, View, FlatList
} from 'react-native';
import Box from './box';

function CommentScreen(props)  {

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={DATA}
                    contentContainerStyle={{ flexGrow: 0.1 }}
                    renderItem={() => <Box style={{ height: '80%' }} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}


const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(CommentScreen);

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