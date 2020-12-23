import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput
} from 'react-native';
import I18n from '../Translation/configureTrans';

let jsonObject = {
    html_attributions: [],
    result: {
        formatted_address: "57-77 Avenue de Fontainebleau, 94270 Le Kremlin-Bicêtre, France",
        geometry: {
            location: {
                lat: 48.81208969999999,
                lng: 2.362477
            },
            viewport: {
                northeast: {
                    lat: 48.81343868029148,
                    lng: 2.363825980291502
                },
                southwest: {
                    lat: 48.81074071970848,
                    lng: 2.361128019708498
                }
            }
        },
        international_phone_number: "+33 1 77 74 40 00",
        name: "Auchan Kremlin Bicêtre - Okabé",
        opening_hours: {
            open_now: true,
            periods: [
                {
                    close: {
                        day: 0,
                        time: "1230"
                    },
                    open: {
                        day: 0,
                        time: "0830"
                    }
                },
                {
                    close: {
                        day: 1,
                        time: "2000"
                    },
                    open: {
                        day: 1,
                        time: "0730"
                    }
                },
                {
                    close: {
                        day: 2,
                        time: "2000"
                    },
                    open: {
                        day: 2,
                        time: "0730"
                    }
                },
                {
                    close: {
                        day: 3,
                        time: "2000"
                    },
                    open: {
                        day: 3,
                        time: "0730"
                    }
                },
                {
                    close: {
                        day: 4,
                        time: "2000"
                    },
                    open: {
                        day: 4,
                        time: "0730"
                    }
                },
                {
                    close: {
                        day: 5,
                        time: "2000"
                    },
                    open: {
                        day: 5,
                        time: "0730"
                    }
                },
                {
                    close: {
                        day: 6,
                        time: "2000"
                    },
                    open: {
                        day: 6,
                        time: "0730"
                    }
                }
            ],
            weekday_text: [
                "Monday: 7:30 AM – 8:00 PM",
                "Tuesday: 7:30 AM – 8:00 PM",
                "Wednesday: 7:30 AM – 8:00 PM",
                "Thursday: 7:30 AM – 8:00 PM",
                "Friday: 7:30 AM – 8:00 PM",
                "Saturday: 7:30 AM – 8:00 PM",
                "Sunday: 8:30 AM – 12:30 PM"
            ]
        },
        photos: [
            {
                height: 514,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100968360572760858473\">Amor CHHIBI</a>"
                ],
                photo_reference: "ATtYBwLvzOL2TX4fr3mHjqxgqvF3IM97JwUj_ZQTV47Tmrw75CezEyc1Qop1ePMglkR5ALXg3NKG4eEP62AYqJ-tUDP8aR9GKBxhODQGpDW4LcGnhHruoCli-QlFF3CeYseaIefU_XZWni3iqStIM9k7NfJmxnA6Y0SdsJRPWOWNnRZsaiwT",
                width: 771
            },
            {
                height: 3024,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/105602851414301469305\">Auchan Kremlin Bicêtre - Okabé</a>"
                ],
                photo_reference: "ATtYBwJiwSNfuSuOf3DqJxXZ7qh9dhjPikt-j6dXDAnKncns1YT23tUVIIZXcxDDMvLHd1in3l00RcTZVmNFrJRoHyANH9VuE0BLGZXWb1SZvzImYmZR2hcR9eqP8quoJ9iJRDTfBjxe2Wz5y435SECWGQmsDjZfJ_EqbT1FCJfw_gdc3Iiy",
                width: 4032
            },
            {
                height: 1365,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/105602851414301469305\">Auchan Kremlin Bicêtre - Okabé</a>"
                ],
                photo_reference: "ATtYBwID6U7JVlt0HoLsIXZAk_bM2qQK_OG02B9SWUsUulgoUVOF_K4TXEMFGVBE-p6iMOcapQHkJme3UCD5nUhPthm2l6zrVn6a1aWTBJzpVRpGk-qQf1XyzfuuRQBAe8vo2iDD03fv7FPFmrgHHM9uzbYHlrwkEtsr6xbIugA04v4MbXHH",
                width: 2048
            },
            {
                height: 2322,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/105195664646425043753\">Thibaut Drouillon</a>"
                ],
                photo_reference: "ATtYBwJk30ptETXTcQy9wjFgPubvYTx5lIPfW4XygNwIGzi2eaC6xi7iqoUjCA_c2cil6YYEWaBj_f1qigJInxYhG2MFe_1LkvOdyuPiFlE_BWt_Tco2O0dqiPmNbTlDfkCc8dWhlayRD8P2nmxdSuU3aHYmZqBX5LQ32iQGGSb9dA2ZWBkx",
                width: 4128
            },
            {
                height: 3024,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/106177062268169393884\">Bernard Bion</a>"
                ],
                photo_reference: "ATtYBwJJZFZTMNBaLSJ-5Lr4L8XlLiV9PEROCfINaX82QG4oDavNqx3_66ZhbD83hs4keAu3eFGt3PX2d7MLoxHCU9Z2OTrE8Ki8Ulxf9lY9WUI4HlPFqPS1DI_f78Pkm6J1G1kpbnUC8nD-Ii7PWS28OUQGkQsUNlQCWrep3R7JQ8kYNJEL",
                width: 4032
            },
            {
                height: 3024,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/115050539895121810041\">Rockia Kebet</a>"
                ],
                photo_reference: "ATtYBwKzpKAhLGMYTD-OoKlYQyTaYu9pRYpG1Ain2ikbTWQxlMcdT87Ks0TmJkr4WPQLxZ-71uU0SsCItHdvI52f05O-z_SzbGdxq-1whAhJt18OKp55GKyfJINE3aLynCwNP7rdQmf4uDNEIzO3xhFPZHuPoeOWwF8_6wyh4WO3IFRNCCA5",
                width: 4032
            },
            {
                height: 4032,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/111891977910488273918\">Ayoung Jo</a>"
                ],
                photo_reference: "ATtYBwI1Dh7TGm-6Gh_knQuzbsMqFmzPp6pqoXeL3OVad_0PxTn-JjIzYZT05fiOk9jmwVIEJyGTE8HUrvQx3crVibDgg1PMWyfLhzkcUo4BX0OHh0mhH6ebOmhoDR8IT3HLUZqbhFIYWOCGoWQ1CqoFRpfHgPJq5qjVaWFtQRmhZP2rwvDq",
                width: 3024
            },
            {
                height: 1080,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/110489888433806177694\">bauduin julien</a>"
                ],
                photo_reference: "ATtYBwJ4w40eYBWSLLLaYsM-xNwIbCm47Agh5pJZlxG1A1xEov-sAd8vqImO_enui4fCHirqS5gj7J538O08mggwbXSU5FNT4qAzXsgn56StWVmXASBbCQkAcAsItfVfqm3Kqc1TLmswBvddbolJzc665kLK9ngXF6ZR47qTRmEWUs6v_-eG",
                width: 1920
            },
            {
                height: 2923,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100404194089959728850\">Manuel AZNAR</a>"
                ],
                photo_reference: "ATtYBwJ60VY-qZybKbQihbV-L9cvmjicW93HHRPak_EOcSBoTbfULHL0HC93mijqKwvZ8YsoVsS-XkenfYZKQ7YKqWwYrbLXaSO-nQtt4S4fn6fK_pSMLL0SFPy2McHN0Wysg2JiTRvcN5FFsPS3BPfJfqFUKCcrpghraF8FJHum3TOvFp3C",
                width: 3952
            },
            {
                height: 3024,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/106346758571421599402\">Ryad R</a>"
                ],
                photo_reference: "ATtYBwIVoECdkTIGetA3xn1t-6kqoPJxytiB19XLCSVQw0my4L4Q7gAx4Gxp5U_4djlIcKbOMo8gWT98pDboi1BbgH_H0Grk3IjbwTO8CJ9sDWO3ZP1wIEpgk5qpys0nKmqbc4EzWoq1-i5fcGalEoB1Clvv-3kpqdjmHWBDG0hhanOnKxiP",
                width: 4032
            }
        ],
        rating: 3.7,
        reviews: [
            {
                author_name: "Vaishnavi Arumugam",
                author_url: "https://www.google.com/maps/contrib/110987913283428979448/reviews",
                language: "en",
                profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14GgtXqEdT3uC2kkeaifIvMj5CsKSTAUijzZCd2CDqA=s128-c0x00000000-cc-rp-mo",
                rating: 3,
                relative_time_description: "a month ago",
                text: "This market is good but I hope to improve more on the different country variety stuffs for example- Indian stuffs like curry powder....etc...",
                time: 1605718693
            },
            {
                author_name: "Maggy Francillette",
                author_url: "https://www.google.com/maps/contrib/102528499756037736666/reviews",
                language: "en",
                profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14GgEhnWKe_vVIUnXZqP3e9tqOsMr5jyCfLe3KexPBw=s128-c0x00000000-cc-rp-mo-ba4",
                rating: 4,
                relative_time_description: "9 months ago",
                text: "Probably the best prices around, if you have the courage to face the long trip,  the huge queues and the time it takes to wind around the endless rows of shelves overflowing with goods.",
                time: 1583165626
            },
            {
                author_name: "Tom Birch",
                author_url: "https://www.google.com/maps/contrib/118078042615411425693/reviews",
                language: "en",
                profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14GhK9l0L82Aw0m1-LczlwL2koMKns5RkUs0yfjuSu5A=s128-c0x00000000-cc-rp-mo",
                rating: 4,
                relative_time_description: "4 months ago",
                text: "Nice store but easy to get lost in",
                time: 1596311368
            },
            {
                author_name: "Sp Saolin",
                author_url: "https://www.google.com/maps/contrib/103177185835187748093/reviews",
                language: "en",
                profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14GinyOMKleXx5kKsCxegorf6yJYpkEKAOLz_0nf0L1I=s128-c0x00000000-cc-rp-mo-ba4",
                rating: 3,
                relative_time_description: "in the last week",
                text: "Good ❤🎊🎈🤔",
                time: 1608570366
            },
            {
                author_name: "Ahlonko Allicio",
                author_url: "https://www.google.com/maps/contrib/103199449382830598835/reviews",
                language: "en",
                profile_photo_url: "https://lh5.googleusercontent.com/-AwOpG3wxSyw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclEAOHFUQ4_jlvIW6gQEgGirgoWmA/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                rating: 4,
                relative_time_description: "3 months ago",
                text: "Troop cool",
                time: 1598709375
            }
        ],
        types: [
            "supermarket",
            "grocery_or_supermarket",
            "food",
            "point_of_interest",
            "store",
            "establishment"
        ],
        user_ratings_total: 3413,
        website: "https://www.auchan.fr/magasins/kremlin-bicetre-okabe/sl-90"
    },
    status: "OK"
}

function sendMessage(value) {
  console.log('messageSent');
}

function Notation(props) {
  const [value, onChangeValue] = React.useState("");
  /*var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
  var now = new Date();

  var day = now.getDayName();
  console.log("______________________________________________" + day)*/

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('information')}</Text>
        <TextInput
          onChangeText={(text) => onChangeValue(text)}
          value={value}
          style={{ borderWidth: 1 }}
        />
        <Button
          onPress={() => {
            sendMessage(value);
          }}
          title={I18n.t('send')}
          color="#841584"
        />
      </View>
      <View>
        <Text> {"\n"} {jsonObject.result.name} {"\n"}</Text>
        <FlatList
          data={jsonObject.result.opening_hours.weekday_text}
          renderItem={({ item }) => <Text> {item} </Text>}
          keyExtractor={(item) => item.id}
        />
        <Text> {"\n"} </Text>
        <FlatList
          data={jsonObject.result.types}
          renderItem={({ item }) => <Text> {item} </Text>}
          keyExtractor={(item) => item.id}
        />
        <Text> {"\n"} {jsonObject.result.formatted_address} {"\n"} </Text>
        <Text> {jsonObject.result.website} {"\n"}</Text>
        {/*<FlatList
          data={jsonObject.result.photos}
          renderItem={({ item }) =>
          <Image
            source={{
              uri: item.html_attributions[0],
            }}
          />}
          keyExtractor={(item) => item.id}
        />*/}
      </View>
    </View>
  );
}

export default Notation;
