'use strict';
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 32,
        paddingTop: 32,
    },
    titles: {
        maxWidth: "100%",
        fontSize: 32,
        textAlign: "left",
        fontWeight: "bold",
        color: "#1C1B1C",
        width: "100%",
    },
    subtitles: {
        maxWidth: "100%",
        fontSize: 32,
        textAlign: "left",
        fontWeight: "bold",
        color: "#1C1B1C",
    },
    paragraphs: {
        maxWidth: "100%",
        fontSize: 16,
        textAlign: "left",
        fontWeight: "bold",
        color: "#1C1B1C",
    },
    subparagraphs: {
        maxWidth: "100%",
        fontSize: 16,
        textAlign: "left",
        fontWeight: "normal",
        color: "#1C1B1C",
    },

    logo: {
        width: 169.7,
        height: 147.4,
        resizeMode: "cover",
        margin: 32,
    },

    textInput: {
        borderRadius: 4,
        color: "#1C1B1C",
        borderColor: "#9B979B",
        borderWidth: 1,
        width: "100%",
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    }
});