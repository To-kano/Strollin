import React from 'react';
import { Button , View} from "react-native";

function ProfileScreen({navigation}) {
    return (
        <View>
            <Button
              title="Go to Home screen"
              onPress={() => navigation.navigate('Home', {name: 'Jane'})}
            />
        </View>
    );
  }

export default ProfileScreen;