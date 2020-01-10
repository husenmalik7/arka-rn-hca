import React from 'react';
import { StyleSheet, View, Text, Button, Picker,
         TextInput, TouchableHighlight,
         Image, FlatList, Alert } from 'react-native';
// import { Searchbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton,
                SlideAnimation } from 'react-native-modals'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

import axios from 'axios';

const url = 'http://192.168.6.140:9000/'

let radio_props = [
  {label: 'Name', value: 0},
  {label: 'Skill', value: 1},
  {label: 'Date Updated', value: 2},
]


class EngineerListScreen extends React.Component {
    state = {
        engineerList: [],
        modalVisible: false,
        radioSelected: 9
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

    modalSubmit(){
      this.setModalVisible(false);
      console.log('...your final radio = ', this.state.radioSelected);
      let radioSelected = this.state.radioSelected; //0 for name, 1 for skill, 2 for dateupdated
      let querySort = '';
      
        if (radioSelected == 0) { 
          querySort = ''

        }


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
                onPress={ () => { console.log("hi"),
                                 this.setModalVisible(true),
                                 this.setState({ radioSelected: 0})
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
                      text="OK"
                      // onPress={() => { this.setModalVisible(false) }}
                      onPress={() => { this.modalSubmit() }}
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

                

                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={true}
                    onPress={(value) => {this.setState({radioSelected:value})}}
                  >

                    
                  </RadioForm>




                </ModalContent>

              </Modal>

             

          </View>
        );
    }
}

export default EngineerListScreen;
