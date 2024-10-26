import { Text, Image, StyleSheet, ScrollView, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { StatusBar } from 'expo-status-bar'


const Blog2 = () => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.title}> 3 Methods for E-Waste Disposal </Text>
            <Text style={styles.subtitle}>E-Waste Collection Centers</Text>
            <Image source={require('../../assets/truck.jpg')} style={styles.image} />
            <Text style={styles.body}>
                You can safely recycle your electronics through local e-waste collection centers. 
                These centers are specifically designed to handle electronic waste, ensuring that 
                hazardous materials are processed in an environmentally friendly manner. By bringing 
                your old devices here, you help prevent toxic substances from entering landfills and 
                polluting the environment.
            </Text>
            <Text style={styles.subtitle}>Manufacturer Recycling Programs</Text>
            <Image source={require('../../assets/apple.jpg')} style={styles.image} />
            <Text style={styles.body}>
                Some manufacturers operate programs to collect and recycle their products. These programs 
                allow consumers to return their old devices directly to the company for responsible 
                recycling. By participating, you not only ensure your e-waste is recycled properly, 
                but you may also receive incentives, such as discounts on new purchases.
            </Text>
            <Text style={styles.body}>
                For example, Apple's recycling program offers customers a way to trade in their old devices 
                for credit towards new ones, while ensuring that the returned products are recycled sustainably.
            </Text>
            <Text style={styles.subtitle}>Donation</Text>
            <Image source={require('../../assets/donate.jpg')} style={styles.image} />
            <Text style={styles.body}>
                If your electronic devices are still functional, consider donating them for reuse. Many 
                organizations, including schools, charities, and community centers, are often in need of 
                working electronics. By donating, you extend the life of the device and help those who may 
                not have access to technology. Ensure that any personal data is wiped from the devices 
                before donating to protect your privacy.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "darkgreen",
        marginVertical: 20
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {
        fontSize: 20,
        marginVertical: 15,
        letterSpacing: 0.3,
        lineHeight: 30
    },

    image: {
        width: '100%',
        height: 200,
        top: 0,
        left: 0,
    },
    reference: {
        marginTop: -10,
        marginBottom: 10
    }
});
export default Blog2
