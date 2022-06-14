
import React, { FC, ReactElement, useRef, useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// import { Icon } from 'react-native-elements';

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    initalSelected: '';
    onSelect: (item: { label: string; value: string }) => void;
}

const DropdownBig: FC<Props> = ({ label, data, onSelect, initalSelected }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);

    useEffect(() => {
        onItemPress(initalSelected)
    }, []);

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <ScrollView>
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            
                {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>
            <Text style={styles.icon}><Icon size={23} name={'chevron-small-down'} /> </Text>
            {/* <Icon style={styles.icon} type="font-awesome" name="chevron-down" /> */}
        </TouchableOpacity>
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        width: '100%',
        zIndex: 1,
        borderWidth: 1,
        // borderColor: "thistle",
        borderRadius: 5,

    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        paddingRight: 8
    },
    dropdown: {
        position: 'absolute',
        width: '90%',
        height:'13%',
        // shadowRadius: 4,
        shadowOffset: { height: 4, width: 10 },
        shadowOpacity: 0.5,
        marginLeft: '5%',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'rgb(0, 0, 0)',
        shadowRadius: 5,
        elevation: 20,
        backgroundColor: 'white',
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: '37%',
        paddingVertical: 10,
        borderBottomWidth: 0.4,
    },
});

export default DropdownBig;