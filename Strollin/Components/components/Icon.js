import React from 'react'
import { Image } from 'react-native'

const ICONS = [
    {
        name: 'add_conversation',
        uri: require("../../assets/icons/add_conversation.png"),
    },
    {
        name: 'add_friend',
        uri: require("../../assets/icons/add_friend.png"),
    },
    {
        name: 'add_map',
        uri: require("../../assets/icons/add_map.png"),
    },
    {
        name: 'add_picture',
        uri: require("../../assets/icons/add_picture.png"),
    },
    {
        name: 'add',
        uri: require("../../assets/icons/add.png"),
    },
    {
        name: 'bin',
        uri: require("../../assets/icons/bin.png"),
    },
    {
        name: 'checked',
        uri: require("../../assets/icons/checked.png"),
    },
    {
        name: 'close',
        uri: require("../../assets/icons/close.png"),
    },
    {
        name: 'comment',
        uri: require("../../assets/icons/comment.png"),
    },
    {
        name: 'conversation',
        uri: require("../../assets/icons/conversation.png"),
    },
    {
        name: 'course',
        uri: require("../../assets/icons/course.png"),
    },
    {
        name: 'facebook',
        uri: require("../../assets/icons/facebook.png"),
    },
    {
        name: 'friend',
        uri: require("../../assets/icons/friend.png"),
    },
    {
        name: 'historic',
        uri: require("../../assets/icons/historic.png"),
    },
    {
        name: 'home',
        uri: require("../../assets/icons/home.png"),
    },
    {
        name: 'logout',
        uri: require("../../assets/icons/logout.png"),
    },
    {
        name: 'mail',
        uri: require("../../assets/icons/mail.png"),
    },
    {
        name: 'map',
        uri: require("../../assets/icons/map.png"),
    },
    {
        name: 'marker',
        uri: require("../../assets/icons/marker.png"),
    },
    {
        name: 'menu',
        uri: require("../../assets/icons/menu.png"),
    },
    {
        name: 'next',
        uri: require("../../assets/icons/next.png"),
    },
    {
        name: 'partner',
        uri: require("../../assets/icons/partner.png"),
    },
    {
        name: 'pencil',
        uri: require("../../assets/icons/pencil.png"),
    },
    {
        name: 'piggy',
        uri: require("../../assets/icons/piggy.png"),
    },
    {
        name: 'profile',
        uri: require("../../assets/icons/profile.png"),
    },
    {
        name: 'return',
        uri: require("../../assets/icons/return.png"),
    },
    {
        name: 'search',
        uri: require("../../assets/icons/search.png"),
    },
    {
        name: 'send',
        uri: require("../../assets/icons/send.png"),
    },
    {
        name: 'settings',
        uri: require("../../assets/icons/settings.png"),
    },
    {
        name: 'share',
        uri: require("../../assets/icons/share.png"),
    },
    {
        name: 'sound_active',
        uri: require("../../assets/icons/sound_active.png"),
    },
    {
        name: 'sound_inactive',
        uri: require("../../assets/icons/sound_inactive.png"),
    },
    {
        name: 'star_empty',
        uri: require("../../assets/icons/star_empty.png"),
    },
    {
        name: 'star_filled',
        uri: require("../../assets/icons/star_filled.png"),
    },
    {
        name: 'step_before',
        uri: require("../../assets/icons/step_before.png"),
    },
    {
        name: 'strollin',
        uri: require("../../assets/icons/strollin.png"),
    },
    
    
];

export default function Icon({name, size, color}) {
    const src = ICONS.find(data => data.name === name);

    return (
        <Image
            source={src.uri}
          style={{
            height: size,
            width: size,
            tintColor: color,
          }}
        />
    )
}