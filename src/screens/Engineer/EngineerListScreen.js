import React from 'react';
import { StyleSheet, View, Text, Picker, ScrollView, AsyncStorage,
         TextInput, TouchableHighlight, DrawerLayoutAndroid, TouchableOpacity,
         Image, FlatList, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton,
                SlideAnimation } from 'react-native-modals'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Container, Header, Item, Input, Icon } from 'native-base';
import { ButtonGroup, Card, Button, Avatar } from 'react-native-elements';

// import { Card, ListItem, Button, Icon } from 'react-native-elements'

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
        queryFSearch: '',
        token: 'ss',
        id_company_state: null,
        visible: false
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible})
    }

    openDrawer(){
      this.drawer.openDrawer()
    }

    componentDidMount() {
        this.getToken()
        this.getData()
    }

    async getToken() {
      try {
        const token = await AsyncStorage.getItem('token')
          if ( token !== null) {
            this.setState({token: token})
            console.log(token)
            return token
          }
      } catch(err) {

      }
    }

  
   
    getData(){
      
      // AsyncStorage.getItem('token').then((data) => {
      //   if(data){
      //     this.setState({token: data});
      //     console.log(this.state.token, '123123123131312312')
      //   } 
      // })

        // AsyncStorage.getItem('token').then(data => {
        //     console.log(data, 'bismillah')
        //     // processData(data)
        //   })


          // AsyncStorage.getItem('token').then(function(data) {
          //   this.setState({token: data})

          // })

        // this.getToken()


          // console.log('aeiawiwia', this.state.token)

          console.log(this.props.navigation, 'qqq')
          const id_company = this.props.navigation.state.params.id_company;
          this.setState({id_company_state: id_company})
          axios.get(url+'engineer', { headers: { Authorization: `Bearer ${this.state.token}`} })
          // axios.get(url+'engineer' )
          .then(res => {
            // console.log(res.data.response);
            this.setState({ engineerList: res.data.response });
            // console.log(this.state.engineerList,'123');
          })
        
        


        // axios.get(url+'engineer', { headers: { Authorization: `Bearer ${token}`} })
        // .then(res => {
        //     // console.log(res.data.response);
        //     this.setState({ engineerList: res.data.response });
        //     // console.log(this.state.engineerList,'123');
        // })
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
      const { navigate } = this.props.navigation;
      // console.log('aeiawiwia22222', this.state.token)

      let drawer = <View style={{flex: 1, backgroundColor: '#fff'}}>
                    

<Avatar
size="xlarge"
rounded
source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkY9D_w6qaqeESztDFNfq9pnCUGr-Sp5MCUP5yW_FI36xBQKOF' }}
onPress={() => console.log("Works!")}
activeOpacity={0.7}
// avatarStyle={{ borderWidth: 2, borderColor: 'black', borderRadius: 20, borderStyle:'solid', borderBottomLeftRadius: 40, borderTopRightRadius: 40 }}
// imageProps={{  borderWidth: 2, borderStyle:'solid', borderRadius: 20, overlayColor : 'white', borderBottomLeftRadius: 40, borderTopRightRadius: 40}}
/>   



                  </View>
      


        return (

          <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => drawer}>
      {/* <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View> */}

          


          <View style={{
              flex: 1, 
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>


    

              <View style={{
                  height: 60, 
                  alignItems: 'center',
                  flexDirection: 'row',
                  // backgroundColor: 'powderblue', 
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                  {/* <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 20, height: 20}} /> */}
<TouchableOpacity >
<Avatar
rounded
source={{
uri:
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkY9D_w6qaqeESztDFNfq9pnCUGr-Sp5MCUP5yW_FI36xBQKOF',
}}
/>
</TouchableOpacity>
                  {/* <Text>2</Text> */}
                  <Image source={{uri: 'https://www.arkademy.com/img/logo%20arkademy-01.9c1222ba.png'}} style={{width: 100, height: 30}} />
                  <Image source={{uri: 'https://www.applozic.com/assets/resources/lib/images/icon-bell.png'}} style={{width: 20, height: 20}} />

                  
              </View>
            
              <View style={{
                height: 50, 
                // backgroundColor: 'red', 
                paddingHorizontal:20,
                justifyContent: 'center'}} >
              
                  
                {/* <Container> */}
                {/* <Header searchBar rounded style={{backgroundColor: 'white'}}> */}
                    <Item>
                      {/* <Icon name="ios-search" /> */}
                      <Input 
                        placeholder="Search" 
                        style={{borderWidth: 1, borderColor: 'black', borderRadius: 10}}
                        // onChangeText={change => {this.setState({ search: change }), this.updateSearch(change) }}
                        // value={this.state.search}
                        onChangeText={change => { this.updateSearch(change) }}
                      />
                      {/* <Icon name="ios-people" /> */}
                    </Item>
                   
                  {/* </Header> */}
                {/* </Container>                   */}

               

              </View>

              

              {/* <View style={styles.container}> */}
              <ScrollView contentContainerStyle={styles.container} >

                  {/* <FlatList
                  data={ this.state.engineerList }
                  renderItem={({item}) => 
                    <Text>{item.name}</Text>
                  }
                  keyExtractor={(item, index) => index.toString() }
                /> */}
                {this.state.engineerList.map((item) => (

                 <View style={styles.item} >
                
                 <Card
                   title={item.name}
                   image={{uri : 'https://i.pinimg.com/736x/ca/d7/e0/cad7e05880129a7e5877563737dad1dd.jpg'}}                   
                   containerStyle={{borderRadius: 10}}
                   >
                   <Text style={{marginBottom: 10}}>
                     {item.location}
                   </Text>
                  

                    <Button
                      // title={item.id_engineer}
                      title="HIRE"
                      onPress={() => navigate('EngineerDetail', {id_engineer: item.id_engineer, id_company: this.state.id_company_state})}
                      buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    />
                 </Card>
 
               </View>


                ))}

              

             
              



                {/* {console.log(this.state.engineerList, 'lopopoppopop')} */}
                {/* <FlatList
                  data={ this.state.engineerList }
                  renderItem={({item}) => 
                    <Text>{item.name}</Text>
                  }
                  keyExtractor={(item, index) => index.toString() }
                /> */}




              </ScrollView>


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
          </DrawerLayoutAndroid>
        );
    }
}

export default EngineerListScreen;


{/* <View style={{flex: 1,  backgroundColor: 'steelblue'}} ></View> */}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'steelblue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    // backgroundColor: 'red',

    width: '50%' // is 50% of container width
    
  }
})
