import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight,FlatList,TextInput,ScrollView,Picker} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
import AddExpense from '../components/AddExpense';
import { Card, SimpleCard } from "@paraboly/react-native-card";
import {Shapes} from "react-native-background-shapes";
import DateTimePicker from "react-native-modal-datetime-picker";

var {height, width} = Dimensions.get('window');

//////Estilos
const {layout, text, login, forms, buttons,colors} = require ('../styles/main');

import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalVisible:false,
      showIcons:false,
      chosenDate: 'Seleccionar fecha' ,
      chosenDateShow: 'Seleccionar fecha',
      displayTab:true,
      ModalIncome:false,
      filterTab:2,
      elements:[],
      balance:[
        {
          id: '1',
          title: 'Salario',
          categoria:'0', ///ingreso
          value:'100.000,00'
        },
        {
          id: '2',
          title: 'Tarjeta de credito',
          categoria:'1', ///egreso
          value:'100.000,00'
        },
        {
          id: '3',
          title: 'Tarjeta de credito',
          categoria:'1', ///egreso
          value:'100.000,00'
        },
        {
          id: '4',
          title: 'Retención',
          categoria:'1', ///egreso
          value:'100.000,00'
        },
        {
          id: '5',
          title: 'Prestamo UAN 2',
          categoria:'1', ///egreso
          value:'400.000,00'
        },
        {
          id: '6',
          title: 'Prestamo UAN 4',
          categoria:'1', ///egreso
          value:'400.000,00'
        },
        {
          id: '7',
          title: 'Prestamo UAN5',
          categoria:'1', ///ingreso
          value:'400.000,00'
        },
        {
          id: '8',
          title: 'Prestamo UAN6',
          categoria:'1', ///ingreso
          value:'400.000,00'
        },
        {
          id: '9',
          title: 'Prestamo UAN7',
          categoria:'1', ///egreso
          value:'400.000,00'
        },
        {
          id: '10',
          title: 'Venta TV',
          categoria:'0', ///ingreso
          value:'400.000,00'
        },
        {
          id: '11',
          title: 'Cesantias',
          categoria:'0', ///ingreso
          value:'400.000,00'
        },
        {
          id: '12',
          title: 'Prima',
          categoria:'0', ///ingreso
          value:'400.000,00'
        }
      ],
    };
}

_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

_handleDatePicked = (date) => {
  this.setState({
      chosenDate : moment(date).format('DD-MM-YYYY')
  });
this.setState({
      chosenDateShow : moment(date).format('DD/MM/YYYY')
  });
  this._hideDateTimePicker();
};

  _setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }

  _toggleIcons = () => this.setState({ showIcons: !this.state.showIcons });
  
  _filterTab = (filter) => {
    this.setState({filterTab: filter});
    this.setState({elements: []});
    if(filter==2){
      // this.setState({elements: []});
      this.setState({elements: this.state.balance});
    }else{
      // this.setState({elements: []});
      var arreglo = [];
      for (let i = 0; i < this.state.balance.length; i++) {
        if(filter==this.state.balance[i].categoria){
            arreglo.push(this.state.balance[i]);
        }
      }
      this.setState({elements: arreglo});
    }
  }


  static navigationOptions = ({ navigation }) => ({
    headerShown:false
  })
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#66E49B' }}>
          <View style={{backgroundColor:'white' ,width:width, height:height*3/7,alignItems: 'center',borderBottomWidth:5,borderColor:colors.AccentPurple}}>
          <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
          Relacion de gastos para Agosto
          </Text>
          <View style={layout.MainTabsCont}>
            <TouchableHighlight
              style={[buttons.MainTabButton, !this.state.displayTab ? buttons.MiddleTab : buttons.MainTabButtonActive ]}
              onPress={() => this.setState({displayTab:true})}
              >
                <Text style={[buttons.MainTabText, 
                  !this.state.displayTab ? text.Regular : text.Strong,  
                  !this.state.displayTab ? text.TLight: text.TAccentPurple
                  ]}>
                  Resumen
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[buttons.MainTabButton, this.state.displayTab ? buttons.MiddleTab : buttons.MainTabButtonActive ]}
              onPress={() => this.setState({displayTab:false})}
              >
                <Text style={[buttons.MainTabText,
                  this.state.displayTab ? text.Regular : text.Strong,  
                  this.state.displayTab ? text.TextOpacityMain: text.TAccentPurple
                  ]}>
                  Grafica
                </Text>
            </TouchableHighlight>
          </View>
          
            { this.state.displayTab  ?
            <View 
              style = {layout.TravelCardCont}>
              <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
                2020/10/11 a  2020/10/12
              </Text>

              <View style={layout.TravelCardInfoCont}>

                <View style={layout.TravelCardInfoColumn}>

                  <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                      Ingresos
                  </Text>
                  <View style={{flexDirection: 'row',}}>
                    <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                    $ 2.350.000,00
                    </Text>
                  </View>
                </View>

                <View style={layout.TravelCardInfoColumn}>

                  <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                      Egresos
                  </Text>

                  <View style={{flexDirection: 'row',}}>
                    <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                    $ 2.000.000,00
                    </Text>
                  </View>

                </View>

              </View>

            </View>
          : 
              <PieChart
                data={[
                  {
                    name: 'Arriendo',
                    population: 30,
                    color: 'rgba(131, 167, 234, 0.7)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                  
                  {
                    name: 'Servicios',
                    population: 20,
                    color: 'rgba(255,255,255,0.7)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Tarjetas',
                    population: 10,
                    color: 'rgba(0,255,0,0.7)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Ahorros',
                    population: 50,
                    color: 'rgba(0, 0, 255,0.7)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                ]}
                width={width}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="20"
                //absolute //for the absolute number remove if you want percentage
              />
            }
          </View>
          <View style={layout.MainTabsCont}>
            <TouchableHighlight
              style={[buttons.MainTabButton, 
                this.state.filterTab == 2 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(2)}
              //onPress={() => this.setState({displayTab:true})}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 2 ? text.Strong : text.Regular,  
                  this.state.filterTab == 2 ? text.TAccentPurple: text.TLight
                  ]}>
                  Todas
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[buttons.MainTabButton,
                this.state.filterTab == 0 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(0)}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 0 ? text.Strong : text.Regular,  
                  this.state.filterTab == 0 ? text.TAccentPurple: text.TLight
                  ]}>
                  Ingresos
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[buttons.MainTabButton,
                this.state.filterTab == 1 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(1)}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 1 ? text.Strong : text.Regular,  
                  this.state.filterTab == 1 ? text.TAccentPurple: text.TLight
                  ]}>
                  Egresos
                </Text>
            </TouchableHighlight>
          </View>
          <ScrollView>
          <FlatList
            data = {this.state.elements}
            style={layout.MainContainerSVFlatlist}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => item.categoria ==0 ? null : this.props.navigation.navigate('CreditCard')}
              >
                <View  style={layout.AdminItemCont}>
                  <View style={layout.AdminItemIconCont}>
                    {item.categoria==0 ?                       
                      <Icon
                        name='cash'
                        type='material-community'
                        color='green'
                        backgroundColor='#000000'
                        size={30}
                        />
                      : 
                        <Icon
                        name='cash'
                        type='material-community'
                        color='red'
                        size={30}
                        backgroundColor='#000000'
                        />
                    }
                  </View>
                  <View style={layout.AdminItemTextCont}>
                    <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLightBlue]}>
                      {item.title}
                    </Text>
                    <Text style={[layout.BillItemText, text.Strong, text.TextOpacityMain,]}>
                      {item.value}
                    </Text>
                    </View>
                </View>
              </TouchableOpacity>
            }
          />
          </ScrollView>
            { this.state.showIcons ? 
              <View style={[layout.ButtonsSpends2]}>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  reverse
                  name='arrow-left'
                  type='material-community'
                  color={colors.main}
                  backgroundColor='#000000'
                  onPress={() => {this._toggleIcons();} }
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Regresar</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='plus'
                  type='material-community'
                  color={colors.main}
                  onPress={() => {this.setState({ModalIncome : true})}}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Agregar {"\n"} Ingreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='minus'
                  type='material-community'
                  color={colors.main}
                  onPress={() => {this.setState({modalVisible : true})}}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Agregar {"\n"} Egreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='book-open-variant'
                  type='material-community'
                  color={colors.main}
                  backgroundColor='#000000'
                  onPress={() => this.props.navigation.navigate('DictionaryScreen')}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Diccionario</Text>
                </View>
              </View>
            :
              <View style={[layout.ButtonsSpends]}>
              <Icon
              reverse
              name='currency-usd'
              type='material-community'
              color={colors.main}
              backgroundColor='#000000'
              onPress={() => {this._toggleIcons();} }
              />
              </View>
            }
            {/* <AddExpense 
               activity_loading={this.state.ModalIncome} 
            />
       */}
            <Loading 
            activity_loading={this.state.activity_loading} 
            activity_text={this.state.activity_text} 
            />
        </View> 
      );
    }
  }
  
  export default Home;