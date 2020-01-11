import React from 'react';
import { StyleSheet, View, Text, Picker,
         TextInput, TouchableHighlight,
         Image, FlatList, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton,
                SlideAnimation } from 'react-native-modals'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { ButtonGroup } from 'react-native-elements';

import axios from 'axios';



const url = 'http://192.168.6.139:9000/'

let radio_props = [
  {label: 'Name', value: 0},
  {label: 'Skill', value: 1},
  {label: 'Date Updated', value: 2},
]


class EngineerListScreen extends React.Component {
    state = {
        engineerList: [],
        modalVisible: false,
        radioSelected: 9,
        selectedIndexOrder: null,
        selectedIndexSort: null,
        stateSearch: '',
        queryFSort: '',
        queryFSearch: ''
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

    modalSubmit = async () => {
      this.setModalVisible(false);
      // console.log('...your final radio = ', this.state.radioSelected);
      // let radioSelected = this.state.radioSelected; //0 for name, 1 for skill, 2 for dateupdated
      console.log('--your selected order = ', this.state.selectedIndexOrder); // 0 for asc, 1 for desc
      console.log('--your selected sort = ', this.state.selectedIndexSort); // 0 for name, 1 for skill, 2for dateupdated
      let selectedIndexOrder = this.state.selectedIndexOrder;
      let selectedIndexSort = this.state.selectedIndexSort;
      let querySort = '';
      let queryOrder = '';
      
      
        if (selectedIndexSort == 0) { querySort = '&sort=name' }
        if (selectedIndexSort == 1) { querySort = '&sort=skill' }
        if (selectedIndexSort == 2) { querySort = '&sort=dateupdated' }
        if (selectedIndexOrder == 0) { queryOrder = '&order=asc' }
        if (selectedIndexOrder == 1) { queryOrder = '&order=desc' }

      
      await this.setState({queryFSort: querySort+queryOrder})
      console.log('[][][]', this.state.queryFSort);

      // await axios.get(url+'engineer/?'+querySort+queryOrder)
      await axios.get(url+'engineer/?'+this.state.queryFSearch+this.state.queryFSort)
      .then(res => {
        this.setState({ engineerList: res.data.response})
      })

    }

    updateIndexOrder(selectedIndexOrder) {
      this.setState({selectedIndexOrder})
    }

    updateIndexSort(selectedIndexSort) {
      this.setState({selectedIndexSort})
    }


    
    updateSearch= async(search) =>{
      // console.log('your search', search)
      await this.setState({stateSearch: search})
      await console.log('state search', this.state.stateSearch) 

      let querySearch = '&name=' + this.state.stateSearch;

      await this.setState({queryFSearch: querySearch})

      await axios.get(url+'engineer/?'+this.state.queryFSearch+this.state.queryFSort)
      .then(res => {
        this.setState({ engineerList: res.data.response})
      })

      
      // http://192.168.6.139:9000/engineer/?name=i
    }

    
    
    
    

    render() {
      const order = ['ASC', 'DESC']
      const sort = ['Name', 'Skill', 'Date Updated']


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
            
              <View style={{height: 50, backgroundColor: 'skyblue', justifyContent: 'center'}} >
              
                  
                <Container>
                  <Header searchBar rounded>
                    <Item>
                      {/* <Icon name="ios-search" /> */}
                      <Input 
                        placeholder="Search" 
                        // onChangeText={change => {this.setState({ search: change }), this.updateSearch(change) }}
                        // value={this.state.search}
                        onChangeText={change => { this.updateSearch(change) }}
                      />
                      {/* <Icon name="ios-people" /> */}
                    </Item>
                    <Button transparent>
                      <Text>Search</Text>
                    </Button>
                  </Header>
                </Container>                  

               

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

                

                  {/* <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={true}
                    onPress={(value) => {this.setState({radioSelected:value})}}
                  />  */}

                  <ButtonGroup
                    buttons={sort}
                    onPress={this.updateIndexSort.bind(this)}
                    selectedIndex={this.state.selectedIndexSort}  
                    fontSize="12"
                  />
                  
                  <ButtonGroup
                    buttons={order}
                    onPress={this.updateIndexOrder.bind(this)}
                    selectedIndex={this.state.selectedIndexOrder}
                  />

                  




                </ModalContent>

              </Modal>

             

          </View>
        );
    }
}

export default EngineerListScreen;
