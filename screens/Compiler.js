import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, StyleSheet, Text, View, Keyboard, ActivityIndicator } from 'react-native'
import { Button, Layout, IndexPath, Select, SelectItem, Input } from '@ui-kitten/components';
import axios from 'axios';

const languages = ['c', 'cpp', 'java', 'python', 'js']

const Compiler = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [lang, setLang] = useState(new IndexPath(0));
    const selectedLang = languages[lang.row];

    const [loading, setLoading] = useState(false);

    const runCode = async () => {
        try {

            setLoading(true)
            const data = {
                "lang": selectedLang,
                "input": "",
                "code": JSON.stringify(code)
            }

            // console.log(data)

            const res = await axios.post('http://192.168.1.47:5000/compile', data)
            const result = await res.data
            console.log("This is output", result.stdout)
            setOutput(result.stdout)
            console.log(data)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                            <Select
                                style={{ width: 150 }}
                                placeholder='C'
                                value={selectedLang}
                                selectedIndex={lang}
                                onSelect={index => setLang(index)}>
                                {languages.map((title, id) => (
                                    <SelectItem key={id} title={title} />
                                ))}
                            </Select>



                            <Button style={styles.button} size='small' onPress={runCode}>
                                {loading ? <ActivityIndicator/> : "Run"}
                            </Button>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Input
                                multiline={true}
                                textStyle={{ minHeight: 500 }}
                                placeholder='Write your code...'
                                value={code}
                                onChangeText={value => setCode(value)}
                            />
                        </View>
                        <View>
                            <Text style={{ color: '#1B4F72', marginTop: 5, marginBottom: 8, fontWeight: '500', fontSize: 18 }}>Output</Text>
                            <Input
                                
                                multiline={true}
                                style={{color: '#E74C3C'}}
                                textStyle={{ minHeight: 100 }}
                                disabled={true}
                                placeholder="Your output here..."
                                value={output}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Compiler

const styles = StyleSheet.create({})