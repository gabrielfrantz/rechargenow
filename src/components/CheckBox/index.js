import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons';

const CheckBox = ({ options = [], onChange, multiple = false }) => {
    const [selected, setSelected] = useState([]);
    function toggle(id) {
        let index = selected.findIndex((i) => i === id);
        let arraySelecteds = [...selected];
        if (index !== - 1) {
            arraySelecteds.splice(index, 1);
        } else {
            multiple ? arraySelecteds.push(id) : arraySelecteds = [id];
        }
        setSelected(arraySelecteds);
    }

    useEffect(() => onChange(selected), [selected])

    return (
        <View>
            {options.map((op, index) => (
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={[styles.touchable, {
                        backgroundColor: selected.findIndex(i => i === op.id) !== -1 ? '515151' : '#fff'
                    }]} onPress={toggle(op?.id)}>
                        {selected.findIndex(i => i === op.id) !== -1 ? (
                            <Icon name="check-bold" color={'#3EBD93'} size={16} />
                        ) : null}
                    </TouchableOpacity>
                    <Text>{op?.text}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchable: {
        height: 20,
        width: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#515151',
        borderWidth: 2
    }

})

export default CheckBox;