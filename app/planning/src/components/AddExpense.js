//'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {TextInput,TouchableOpacity,ScrollView,Modal } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');

class AddExpense extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={ [layout.MainContainer] }>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.activity_loading}>   
         
        <View style={[layout.GralTextCont, {marginBottom: 60,marginTop:30}]}>
            <Text style={[text.GralText, text.Regular]}>
            Registro 
            </Text>
        </View>
        <ScrollView
          style = { layout.MainContainerSV }
          showsVerticalScrollIndicator = {false}
          >
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Nombres
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Ingresar Nombres"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Nombres no validos
                    </Text>
            </View>
        </View>
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Apellidos
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Apellido"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Apellido no valido
                    </Text>
            </View>
        </View>

        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Email
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment,forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    //onChangeText={(email) => this.validate('email','email','emailError',email)}
                    placeholder='Ingresar Email'
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                      Ingresar Email de forma correcta
                    </Text>
            </View>
        </View>

        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Confirmacion Email
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Confirmar Email"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Error: Emails no conciden.
                    </Text>
            </View>
        </View>
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Contraseña
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Ingresar Nombres"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Nombres no validos
                    </Text>
            </View>
        </View>
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Confimar Contraseña
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Apellido"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Apellido no valido
                    </Text>
            </View>
        </View>
        <TouchableOpacity 
            onPress={() => this.validateMail()}
            style={[buttons.GralButton, buttons.BLightBlue]}>
            <Text style={[text.BText, text.TLight]}>
              Enviar
            </Text>
        </TouchableOpacity>
        </ScrollView>
        </Modal>
      </View>
    );
  }
}



export default AddExpense;