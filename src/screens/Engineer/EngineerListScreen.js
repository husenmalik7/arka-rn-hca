import React from 'react';
import { StyleSheet, View, Text, Button, Picker,
         TextInput, TouchableHighlight,
         Image, FlatList, Alert } from 'react-native';
// import { Searchbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton,
                SlideAnimation } from 'react-native-modals'

import axios from 'axios';

const url = 'http://192.168.6.140:9000/'

class EngineerListScreen extends React.Component {
    state = {
        engineerList: [],
        modalVisible: false
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible})
    }

    componentDidMount() {
        this.getData()
    }

    getData(){
        // axios.get('http://mhs.rey1024.com/apibudaya/getListCategory.php')
        axios.get(url+'engineer', console.log('URLRURLRURLRU'))

        
        .then(res => {
            // console.log(res.data.response);
            this.setState({ engineerList: res.data.response });
            // console.log(this.state.engineerList,'123');
        })
    }

    



    render() {
        return (

          <View style={{
              flex: 1, 
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>

              <View style={{
                  height: 50, 
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'powderblue', 
                  justifyContent: 'space-between',
                }}>
                  <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 20, height: 20}} />
                  <Text>2</Text>
                  <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 20, height: 20}} />
              </View>
            
              <View style={{height: 50, backgroundColor: 'skyblue', alignItems: 'center',   justifyContent: 'center'}} >
                  {/* <Searchbar style={{width: '80%'}} placeholder="Search"/> */}
                  <Text>Caritana search bar</Text>
              </View>

              <View style={{flex: 1,  backgroundColor: 'steelblue'}} >
                {/* {console.log(this.state.engineerList, 'lopopoppopop')} */}
                <FlatList
                  data={ this.state.engineerList }
                  renderItem={({item}) => <Text>{item.name}</Text>}
                  keyExtractor={(item, index) => index.toString() }
                />
              </View>


              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { console.log("hi"),
                                 this.setModalVisible(true)
                                //  this.setState({ modalVisible: true })
                               }}
              />

              <Modal
                visible={this.state.modalVisible}
                modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                onTouchOutside={() => { this.setModalVisible(false) }}
                modalTitle={<ModalTitle title="sesuatu title" />}
                footer={
                  <ModalFooter>
                    <ModalButton 
                      text="Cancel"
                      onPress={() => { this.setModalVisible(false) }}
                    />
                    <ModalButton 
                      text="OK"
                      onPress={() => {}}
                    />
                  </ModalFooter>
                }
              >
                


                <View style={{
                  flex: 0.1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'}}>
                    <View style={{
                      width: 300,
                      height: 100}}>

                    </View>
                </View>
          
                <ModalContent>
                  <Text>
                    Sort By : 
                  </Text>

                  <Picker>
                    <Picker.Item label="Name" />
                    <Picker.Item label="Skill" />
                    <Picker.Item label="Date Updated" />
                  </Picker>


                </ModalContent>

              </Modal>

             

          </View>
        );
    }
}

export default EngineerListScreen;
