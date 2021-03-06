import React from 'react';
import { View, Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Modal } from 'react-native';

const {layout, text, forms, buttons,colors} = require ('../styles/main');

import ModalSelector from 'react-native-modal-selector';
import { Table, Row, Rows } from 'react-native-table-component';
import {Shapes} from "react-native-background-shapes";
import NetInfo from "@react-native-community/netinfo";
import { Card, SimpleCard } from "@paraboly/react-native-card";
import numeral from 'numeral';
import ModalInstructor from "react-native-modal";
import {SimpleAlert} from '../components/modalAlert';
const {TOO_MUCH_INTEREST_MONEY,TOO_MUCH_FEE,BETTER_INTEREST,DEFINITION_INTEREST,DEFINITION_TYPES} = require ('../facts/facts');

import {getSession} from '../helpers/users_services';
import {getDefaultPeriod} from '../helpers/period_services';
import {CreateExpense} from '../helpers/expense_services';


import {masterValidator} from '../helpers/validations';




class Simulator extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = {
      online: navigation.getParam('online', true),
      textInputValue: '',
      typeCredit:'',
      modalVisible:false,
      suggest:'',
      typeTransaction:null,
      modalInstructor:false,
      SuccessModal:false,
      tableHead: ['Mes','Pago \nMinimo', 'Interes','Total \nIntereses', 'Deuda \nVigente'],
      tableData: [
        ['1','$30,780.50', '$0.00', '$123,122.00'],
        ['2','$35,348.33', '$4,567.83', '$96,909.33'],
        ['3','$32,085.59', '$1,305.09', '$62,866.09'],
        ['4','$31,433.05', '$652.55', '$31,433.05'],
        ['5','$35,348.33', '$4,567.83', '$96,909.33'],
        ['6','$32,085.59', '$1,305.09', '$62,866.09'],
        ['7','$31,433.05', '$652.55', '$31,433.05'],
        ['8','$35,348.33', '$4,567.83', '$96,909.33'],
        ['9','$32,085.59', '$1,305.09', '$62,866.09'],
        ['10','$31,433.05', '$652.55', '$31,433.05'],
        ['11','$35,348.33', '$4,567.83', '$96,909.33'],
        ['12','$32,085.59', '$1,305.09', '$62,866.09'],
        ['13','$31,433.05', '$652.55', '$31,433.05'],
        ['14','$35,348.33', '$4,567.83', '$96,909.33'],
        ['15','$32,085.59', '$1,305.09', '$62,866.09'],
        ['16','$31,433.05', '$652.55', '$31,433.05'],
        ['17','$35,348.33', '$4,567.83', '$96,909.33'],
        ['18','$32,085.59', '$1,305.09', '$62,866.09'],
        ['19','$31,433.05', '$652.55', '$31,433.05']
      ]
  };
}

SimulateCredit(typeCredit){
 let select = typeCredit? typeCredit.value : null;

 switch (select) {
   case 0:
     this.SimulateCreditCard();
     break;

    case 1:
      this.SimulateCreditCard();
    break;

    case 2:
      this.SimulateCreditEstate();
    break;
 
    case 3:
      this.SimulateCreditCard();
    break;

 }
}

componentDidMount(){
  if(!this.state.online){
    NetInfo.fetch().then(state => {
      if(state.isConnected){
        this.props.navigation.navigate('Login');
      }
    });
  }
}
SimulateCreditEstate(){
  let amount = this.state.amount ? this.state.amount : 0;
  let numberFee = this.state.numberFee ? this.state.numberFee : 0;
  let interest = this.state.interest ? parseFloat(this.state.interest)/100 : 0;
  let Totaldebt=parseFloat(amount);
  let MinimumPay;
  let dataSimulation=new Array();
  let Showinterest;
  let TotalShowinterest = 0;
  let feestatic = (Totaldebt*interest)/(1-Math.pow((1+interest), -numberFee));
  for (let index = 1; index <= numberFee; index++) {
    Showinterest =  parseFloat(Totaldebt*interest);
    MinimumPay =  feestatic-Showinterest;
    TotalShowinterest = Showinterest+TotalShowinterest;
    Totaldebt = (Totaldebt-MinimumPay)>0 ? Math.trunc(Totaldebt-MinimumPay) : 0 ;
    let value = [index,numeral(feestatic).format('$0,0'),numeral(Showinterest).format('$0,0'),numeral(TotalShowinterest).format('$0,0'),numeral(Totaldebt).format('$0,0')];
    dataSimulation.push(value);
  }
  this.setState({tableData: dataSimulation});
  this.setState({modalVisible:true });
  this.setState({TotalShowinterest});
  this.setState({suggest: ""});
}

SimulateCreditCard(){
  let amount = this.state.amount ? this.state.amount : 0;
  let numberFee = this.state.numberFee ? this.state.numberFee : 0;
  let interest = this.state.interest ? parseFloat(this.state.interest)/100 : 0;
  let Totaldebt=parseFloat(amount);
  let MinimumPay;
  let dataSimulation=new Array();
  let Showinterest;
  let TotalShowinterest = 0;
  let firstFee=0;
  
  for (let index = 1; index <= numberFee; index++) {
    if(numberFee == 1){
      MinimumPay = Totaldebt;
      Showinterest = 0;
      TotalShowinterest=0;
      Totaldebt = 0;
    }else{
      Showinterest =  parseFloat(Totaldebt*interest);
      Totaldebt = Totaldebt+(Showinterest);
      MinimumPay =  amount/numberFee + Showinterest;
      TotalShowinterest = Showinterest+TotalShowinterest;
      Totaldebt = (Totaldebt-MinimumPay)>0 ? Math.trunc(Totaldebt-MinimumPay) : 0 ;
    }
    firstFee = index == 1 ?this.setState({firstfee: MinimumPay}): null;
    let value = [index,numeral(MinimumPay).format('$0,0'),numeral(Showinterest).format('$0,0'),numeral(TotalShowinterest).format('$0,0'),numeral(Totaldebt).format('$0,0')];
    dataSimulation.push(value);
  }
  this.setState({tableData: dataSimulation});
  this.setState({modalVisible:true });
  this.setState({TotalShowinterest});
  this.setState({suggest: ""});
  
  if(interest*100>2.1){
    this.setState({suggest: BETTER_INTEREST});
  }
  if(TotalShowinterest>=100000){
    this.setState({suggest: TOO_MUCH_INTEREST_MONEY});
  }
  if(numberFee>=12){
    this.setState({suggest: TOO_MUCH_FEE});
  }

  if(this.state.typeCredit.value != 0){
    this.setState({suggest: ""});
  }
}
  async SaveAsExpense(){
    const onSession = await getSession();
    let idUser = onSession.id;
    let IdPeriod = await getDefaultPeriod(idUser);
    IdPeriod = IdPeriod.status ? IdPeriod.message : 0 ;
    let id_categoryincome = 2;
    let chosenDate = null;
    let name = "Simulación";
    let firstFee = this.state.firstfee;
    let IncomeResponse = await CreateExpense(name,id_categoryincome,chosenDate,firstFee,IdPeriod);
    
    if(IncomeResponse.status){
      this.setState({SuccessModalLine1: IncomeResponse.message});
      this.setState({SuccesbuttonLabel: "ok, entendido"});
      this.setState({SuccessModal : true});
    }
   
  }

  //////////////////////Validations////////////////////////
  validate(kind,state,type,input){
    this.setState({[state] : input});
    var verdict = masterValidator(kind,input);
    this.setState({[type] : verdict});
  }
    render() {
      const data = [
          { key: 0,  label: 'Tarjeta de Crédito', value: 0 },
          { key: 1, label: 'Crédito Libre Inversión', value:1 },
          { key: 2, label: 'Crédito Inmobiliario', value:2 },
          { key: 3, label: 'Crédito Educativo', value:3 },
      ];
      const data2 = [
        { key: 0,  label: 'Avances', value: 0 },
        { key: 1, label: 'Compras', value:1 },
    ];
      return(
        <View style={ [layout.MainContainer] }>
          <Shapes
            primaryColor={colors.BackgroundColorDefault}
            secondaryColor={colors.main}
            height={1}
            borderRadius={2}
            figures={[
            {name: 'circle', position: 'center', size: 60},
            {name: 'donut', position: 'flex-start', axis: 'top', size: 80},
            {name: 'circle', position: 'center', axis: 'right', size: 100},
            {name: 'donut', position: 'flex-end', axis: 'right', size: 80},
            {name: 'circle', position: 'flex-end', axis: 'left', size: 100},
            ]}
          />
                    <ScrollView
            style = { layout.MainContainerSV2 }
            showsVerticalScrollIndicator = {false}
            >
          <View style={[layout.GralTextCont, {marginBottom: 60,marginTop:30}]}>
            <Text style={[text.TitleView, text.Strong, text.TLight]}>
               Simulación de créditos
            </Text>
          </View>

            <View style={{marginBottom: 10,}}>
                <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                Tipo de crédito
              </Text>
              <ModalSelector
                  data={data}
                  initValue="Algo"
                  onChange={(option)=>{ this.setState({typeCredit:option})}}
                  cancelText = 'Cancelar'
                  overlayStyle = {forms.PickerOverlay}
                  optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                  optionStyle ={forms.PickerOptionCont}
                  optionTextStyle = {forms.PickerOptionText}
                  selectedItemTextStyle = {[text.Regular, text.TextColorMain]}
                  cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                  cancelTextStyle = {[text.BText, text.TextColorMain]}
                  >                            

                  <View style={[forms.InputCont, forms.LeftAlingment, 
                  this.state.currencyTypeError ? forms.AlertInput:null]}>
                      <TextInput
                      style={forms.Picker}
                      editable={false}
                      placeholder= 'Tipo de crédito'
                      value={this.state.typeCredit?this.state.typeCredit.label:''} />
                  </View>
              </ModalSelector>
              {/* <View style={layout.textAlertCont}>
                  <Text style={[layout.textAlertError, text.Regular]}>
                      Error
                  </Text>
              </View> */}
            </View>

            {this.state.typeCredit.value == 0 ? 
            <View style={{marginBottom: 10,}}>
              <TouchableOpacity style={[layout.InputGroup]} 
              onPress={() => {
                this.setState({modalInstructor:true}),
                this.setState({conceptTitle: "Tipos de Movimiento"}),
                this.setState({concept: DEFINITION_TYPES})
              }}>
                <Text style={[text.InputLabel,forms.LeftAlingment]}>
                Tipo de Transaccion(%){"   "}<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
                </Text>
              </TouchableOpacity>
              <ModalSelector
                  data={data2}
                  initValue="Algo"
                  onChange={(option)=>{ this.setState({typeTransaction:option})}}
                  cancelText = 'Cancelar'
                  overlayStyle = {forms.PickerOverlay}
                  optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                  optionStyle ={forms.PickerOptionCont}
                  optionTextStyle = {forms.PickerOptionText}
                  selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                  cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                  cancelTextStyle = {[text.BText, text.TLightBlue]}
                  >                            

                  <View style={[forms.InputCont, forms.LeftAlingment, 
                  this.state.currencyTypeError ? forms.AlertInput:null]}>
                      <TextInput
                      style={forms.Picker}
                      editable={false}
                      placeholder= 'Tipo de Transacciones'
                      value={this.state.typeTransaction?this.state.typeTransaction.label:''} />
                  </View>
              </ModalSelector>
              </View>
            :null}   
            {this.state.typeCredit ? 
            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Numero de cuotas
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(numberFee) => this.validate('num','numberFee','numberFeeError',numberFee)}
                        placeholder="Ingresar numero de cuotas"
                        keyboardType = "numeric"
                    />
                </View>
                {this.state.numberFeeError? 
                <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                    Numero de cuotas no validas
                    </Text>
                </View>
              :null}
            </View>
            :null}
            {this.state.typeCredit ?
            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Precio
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(amount) => this.validate('num','amount','amountError',amount)}
                        placeholder="Ingresar valor de la compra"
                        keyboardType = "numeric"
                    />
                </View>
                {this.state.amountError? 
                <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                    Precio no valido
                    </Text>
                </View>
              :null}
            </View>
            :null}
            {this.state.typeCredit ?
            <View style={layout.InputGroup}>
              <TouchableOpacity style={[layout.InputGroup]} 
              onPress={() => {
                this.setState({modalInstructor:true}),
                this.setState({conceptTitle: "Interes Mensual"}),
                this.setState({concept: DEFINITION_INTEREST})
              }}>
                <Text style={[text.InputLabel,forms.LeftAlingment]}>
                Intereses Mensual(%){"   "}<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
                </Text>
              </TouchableOpacity>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(interest) => this.validate('num','interest','interestError',interest)}
                        placeholder="Confirmar Intereses"
                        keyboardType = "numeric"
                    />
                </View>
                {this.state.interestError?
                  <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Error: valor no Numerico
                    </Text>
                  </View>
                :null} 
            </View> 
            :null}
            {/* {this.state.typeCredit?
              <View style={layout.InputGroup}>
              <TouchableOpacity style={[layout.InputGroup]} 
                  onPress={() => {
                  this.setState({modalInstructor:true}),
                  this.setState({conceptTitle: "Seguro de vida"}),
                  this.setState({concept: DEFINITION_MANAGEMENT})
                }}>
                    <Text style={[text.InputLabel,forms.LeftAlingment]}>
                    ¿Seguro de vida? <Text style={text.InputLabelQuestion}> ¿Que es esto?</Text>
                    </Text>
                </TouchableOpacity>
              <ModalSelector
                  data={[
                    { key: 0, label:"Si" },
                    { key: 1,label: "No" },
                ]}
                  initValue="Algo"
                  onChange={insurance => this.validate('','insurance','insuranceError',insurance)}
                  cancelText = "Cancelar"
                  overlayStyle = {forms.PickerOverlay}
                  optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                  optionStyle ={forms.PickerOptionCont}
                  optionTextStyle = {forms.PickerOptionText}
                  selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                  cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                  cancelTextStyle = {[text.BText, text.TLightBlue]}
                  >                            
                  <View style={[forms.InputCont, forms.LeftAlingment]}>
                      <TextInput
                      style={forms.Picker}
                      editable={false}
                      placeholder= "Seleccionar si tiene cuota de manejo"
                      value={this.state.insurance?this.state.insurance.label:''} />
                  </View>
              </ModalSelector>
              </View>
            :null}
            {this.state.insurance?  
              <View style={[layout.InputGroup]}>
                  <Text style={[text.InputLabel,forms.LeftAlingment]}>
                      Valor seguro de vida
                      </Text>
                    <View style={[forms.InputCont, forms.LeftAlingment, this.state.amountInsuranceError ?forms.AlertInput:null]}>
                        <TextInput
                            style={forms.Input}
                            onChangeText={(amountInsurance) => this.validate('numNull','amountInsurance','amountInsuranceError',amountInsurance)}
                            placeholder="Ingresar Intereses"
                            keyboardType = "numeric"
                            value={this.state.amountInsurance}
                        />
                    </View>
                    {this.state.InterestError? 
                      <View style={layout.textAlertCont}>
                          <Text style={[layout.textAlertError, text.Regular]}>
                          Valor no valido
                          </Text>
                      </View>
                    :null}
                </View>
              :null} */}
              <TouchableOpacity 
                  onPress={() => this.SimulateCredit(this.state.typeCredit)}
                  style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                  <Text style={[text.BText, text.TLight]}>
                    Calcular
                  </Text>
              </TouchableOpacity>
            </ScrollView>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>  
             <ScrollView style={{margin:20}}>
                <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
                  Calculo de intereses
                </Text>
                <Table borderStyle={{borderWidth: 3, borderColor: colors.main}}
                >
                  <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table>
                <Text style={{textAlign:'justify',paddingTop:'5%'}}>
                El interes total que se pagaria por esta compra seria de   
                    <Text style={{color:'red',fontSize:18}}>
                      {numeral(this.state.TotalShowinterest).format('$0,0')}
                  </Text>
                  .
                </Text>
                {this.state.suggest?
                  <SimpleCard title={this.state.suggest} 
                          styles={{ paddingBottom:10 }}
                        />
                :null}
                <Text style={{textAlign:'justify'}}>
                  Este simulador ofrece un estimativo de como serian las cuotas mas no 
                  una herramienta oficial del banco.
                </Text>
              </ScrollView>
              {this.state.typeCredit.value == 0 ? 
                <TouchableOpacity 
                  onPress={() => this.SaveAsExpense()}
                  style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                      Guardar como egreso
                    </Text>
                </TouchableOpacity>
              :null}
              <TouchableOpacity 
                onPress={() => this.setState({modalVisible:false})}
                style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                  <Text style={[text.BText, text.TLight]}>
                    Cerrar
                  </Text>
              </TouchableOpacity>
            </Modal>
            <ModalInstructor
          backdropColor = {colors.opacityMain}
          backdropOpacity = {0.9}
          style = { { margin: 0} }
          isVisible={this.state.modalInstructor}
          useNativeDriver={true}
        >  
            <View 
              style={layout.ModalTrialInfoCont}
            >
              <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
              {this.state.conceptTitle}
              </Text>
              <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
              <SimpleCard
                  titleFontSize = {16}
                  title={this.state.concept}
                />
              </View>
              <View style={[layout.GralTextCont]}>
                  <TouchableOpacity 
                      onPress={() =>{this.setState({modalInstructor: false}),this.props.navigation.navigate('DictionaryScreen') }}
                      style={[buttons.GralButton, buttons.BLinePurple]}>
                      <Text style={[text.BText, text.TAccentPurple]}>
                          Mas información 
                      </Text>
                  </TouchableOpacity>
              </View>
              <View style={[layout.GralTextCont]}>
                  <TouchableOpacity 
                      onPress={() => this.setState({modalInstructor: false})}
                      style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                      <Text style={[text.BText, text.TLight]}>
                          Cerrar 
                      </Text>
                  </TouchableOpacity>
              </View>
            </View>
        </ModalInstructor>
        <SimpleAlert 
        isModalVisible = {this.state.SuccessModal} 
        imageType = {2}
        line1 = {this.state.SuccessModalLine1}
        line2 = {this.state.SuccessModalLine2}
        buttonLabel = {this.state.SuccesbuttonLabel}
        closeModal={() => this.setState({SuccessModal: false})}
        />

            </View>
    );
  }
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 60, backgroundColor: colors.opacityMain },
    text: { margin: 6 }
  });
  export default Simulator;