import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { StatusBar } from 'expo-status-bar'

const Blog1 = () => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.title}>The Dangers of E-Waste</Text>
            <Image source={require('../../assets/electronics.jpg')} style={styles.image} />
            <Text style={styles.subtitle}>What is E-Waste?</Text>
            <Text style={styles.body}>
                E-waste, or electronic waste, refers to discarded electronic devices and
                equipment that are no longer in use. This includes items like old computers,
                smartphones, televisions, printers, and other electronic gadgets. 
            </Text>
            <Text style={styles.body}>
                E-waste is a growing environmental concern because many of these devices contain hazardous
                materials, such as heavy metals and toxic chemicals, that can pollute the
                environment if not properly disposed of or recycled. Additionally, e-waste
                can also contain valuable materials like gold, silver, and copper, which can
                be recovered through proper recycling methods.
            </Text>
            <Text style={styles.subtitle}>The Rising Problem</Text>
            <Image source={require('../../assets/graph.png')} style={styles.image} /> 
            <Text style={styles.reference}>source: The Global E-waste Monitor 2024 by UNITA</Text>
            <Text style={styles.body}>
                In 2022, a record-breaking 62 million tonnes (Mt) of electronic waste was produced,
                an 82% increase since 2010, and is expected to climb by another 32% to reach 82
                million tonnes by 2030. Valuable strategic resources worth billions of dollars
                are being wasted and discarded, while only 1% of the demand for rare earth elements
                is fulfilled through e-waste recycling.
            </Text>
            <Text style={styles.body}>
                The 62 million tonnes of e-waste generated in 2022 would fill approximately 1.55 million
                40-tonne trucks, which could form a bumper-to-bumper line circling the entire equator,
                according to a report from ITU and UNITAR.
            </Text>
            <Text style={styles.subtitle}>Call for Global Action</Text>
            <Text style={styles.body}>
                Despite this massive production, less than a quarter (22.3%) of the total e-waste was properly
                collected and recycled in 2022, leaving an estimated US$ 62 billion worth of recoverable materials
                unaccounted for, further exacerbating pollution risks globally. 
            </Text>
            <Text style={styles.body}>
                Over the past two decades, Canada's electronic waste has more than tripled, and this trend is expected to continue rising.
            </Text>
            <Text style={styles.body}>
                The growing volume of e-waste highlights the urgent need for improved recycling infrastructure and stronger
                global efforts to manage electronic waste responsibly.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 33,
        fontWeight: "bold",
        color: "darkgreen"
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {
        fontSize: 20,
        marginBottom: 15,
        letterSpacing: 0.3,
        lineHeight: 30
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9, 
        resizeMode: 'cover', 
        marginVertical: 20,
    },
    reference: {
        marginTop: -10,
        marginBottom: 10
    }
});

export default Blog1;
