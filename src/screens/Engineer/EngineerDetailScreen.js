import React, {Component} from 'react';

// import {View} from 'react-native';
import { Container, Header, View, Fab, Picker } from 'native-base';
import { Button, Text, Avatar, Image, Overlay, Icon } from 'react-native-elements';



import axios from 'axios';



const url = 'http://192.168.6.139:9000/'

class EngineerDetailScreen extends React.Component {
  state = {
    engineerDetail: [],
    isVisible: false,
    id_company: 0,
    project: [], 
    selected: null
  }

  onValueChange(selected){
    this.setState({selected})
    
    console.log(this.state.selected)
  }

  handlePress(){
    console.log('777', this.state.selected)
    const engineerDetail = this.state.engineerDetail

    data = {
            id_engineer: engineerDetail.id_engineer,
            id_user: engineerDetail.id_user,
            name: engineerDetail.name,
            description: engineerDetail.description,
            skill: engineerDetail.skill,
            location: engineerDetail.location,
            dateofbirth: engineerDetail.dateofbirth,
            showcase: engineerDetail.showcase,
            datecreated: engineerDetail.datecreated,
            dateupdated: engineerDetail.dateupdated,
            total_project_done: engineerDetail.total_project_done,

            id_company: this.state.id_company,
            total_project: engineerDetail.total_project + 1,
            hire_status: 1
    }

    data2 = {
      name: this.state.project.name,

      id_engineer: this.props.navigation.state.params.id_engineer,
      id_company: this.state.id_company,
      status: 1
    }

    const id_engineer = this.props.navigation.state.params.id_engineer;
    axios.put(url+'engineer/'+id_engineer, data)

    const id_company = this.state.id_company;
    axios.put(url+'company/'+id_company+'/project', data2)



  }

 


  componentDidMount(){
    this.getData()
  }


  getData(){
    // console.log('122', this.props.navigation)
    this.setState({id_company: this.props.navigation.state.params.id_company})
    const id_engineer = this.props.navigation.state.params.id_engineer;
    axios.get(url+'engineer/'+id_engineer, console.log('URLRURLRURLRU'))
    .then(res => {
      // console.log(res.data.response[0].name);
      this.setState({ engineerDetail: res.data.response[0] });
    })
  }

  getProjectCompany(){
    axios.get(url+'company/'+this.state.id_company+'/project')
    .then(res=> {
      console.log(res.data.response, '777');
      this.setState({ project: res.data.response })
    })
    
  }

  async getIdCompany() {
    try {
      const id_company = await AsyncStorage.getItem('id_company')
        if ( id_company !== null) {
          this.setState({id_company: id_company})
          console.log(id_company)
          return id_company
        }
    } catch(err) {

    }
  }

  

  showModal(value){
    console.log(this.state.id_company)
    this.getProjectCompany()
    this.getIdCompany()
    this.setState({isVisible: value})
  
  }

  render() {

    const { navigate, state } = this.props.navigation;
    // console.log(this.props.navigation.state.params.id_engineer, '***');

    const engineerDetail = this.state.engineerDetail;
    const project = this.state.project;

    console.log(project, 'ooo')


    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch',
      }}>
        <View style={{
          height: '30%',      
          // backgroundColor: 'darkslateblue'
        }} >          
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdI57vrHqTHc5vUmAgA0-jFlzmm-E7cwoUO1YzuUCi__Wkw3Rs' }}
              style={{ width: '100%', height: '100%' }}
            />            
        </View>
                <View style={{
                  height: '60%',
                  // backgroundColor: 'deeppink'
                  // borderWidth:1,
                  // borderColor: 'gray'
                }}>
                        <View style={{
                          height: '40%',
                          // backgroundColor: 'lightblue',
                          flexDirection: 'row'
                        }}>
                                <View style={{
                                  width: '55%',
                                  // backgroundColor: 'lightpink',
                                  justifyContent: "center",
                                  alignItems: "center"
                                }} >
                                    <Avatar
                                      size="xlarge"
                                      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRN6RmtibSm3MqFgxNC94Lj2e5-ew56pQNwGVzONz-MQMOncRzX' }}
                                      onPress={() => console.log("Works!")}
                                      activeOpacity={0.7}
                                      avatarStyle={{ borderWidth: 2, borderColor: 'black', borderRadius: 20, borderStyle:'solid', borderBottomLeftRadius: 40, borderTopRightRadius: 40 }}
                                      imageProps={{  borderWidth: 2, borderStyle:'solid', borderRadius: 20, overlayColor : 'white', borderBottomLeftRadius: 40, borderTopRightRadius: 40}}
                                    />         
                                </View>

                                <View style={{
                                  width: '45%',
                                  // backgroundColor: 'peru'
                                }} >
                                    <Text h3>{engineerDetail.name}</Text>
                                    <Text> {engineerDetail.location}</Text>
                                    
                                    <Text> TP : {engineerDetail.total_project}</Text>
                                    <Text> SR : {((engineerDetail.total_project_done/engineerDetail.total_project) * 100)} % </Text>
                                </View>
                        </View>
                        <View style={{
                          height: '60%',
                          // backgroundColor: 'lightgreen',
                          paddingHorizontal: '5%'
                        }} >
                            <Text> {engineerDetail.description} </Text>
                            <Text> {"\n"} </Text>
                            <Text> Skill : </Text>
                            <Text> {engineerDetail.skill} </Text>
                        </View>
                </View>
        <View style={{
          height: '10%',
          // backgroundColor: 'goldenrod',
          justifyContent: "center",
          alignItems: "center"
        }} >
            <View style={{
                width: '90%',
                // backgroundColor: 'darkslateblue'
            }} >

              { 
                (this.state.id_company === undefined) ?

                <Button
                  title="Edit"
                />

                

                :

                

                <Button
                title="Hire Me"
                buttonStyle={{borderRadius: 10}}
                onPress={() => this.showModal(true) }
                />

                
              
              }

              

              
            </View>
        </View>

        {
           (this.state.id_company === undefined) ?
            <View/>
           :

           <Fab
            active='false'
            style={{ backgroundColor: '#F4CF5D' }}
            position="topLeft"
            onPress={() => navigate('EngineerList')}
        >
            <Icon name='rowing' />
        </Fab>
        }

        

<View>
<Overlay 
isVisible={this.state.isVisible}
onBackdropPress={() => this.showModal(false)}
animationType='fade'
height='30%'
overlayStyle={{justifyContent: "center", alignItems: "center"}}
>
<Text h4>Select Project</Text>

<Picker
note
mode="dropdown"
style={{ width: 120 }}
center
selectedValue={this.state.selected}
onValueChange={this.onValueChange.bind(this)}
>
  {
    project.map((item) => (
      <Picker.Item label={item.name} value={item.id_project} 
      />
    ))
  }

  
</Picker>

<Button
    title="Give Project"
    onPress={() => {this.handlePress(), this.showModal(false)}}
/>



</Overlay>
</View>




      </View>
    );
  }
}

export default EngineerDetailScreen;