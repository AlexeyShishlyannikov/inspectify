import 'package:flutter/material.dart';
import 'package:logisticsinspect/constants/constants.dart';

class DriverEditPage extends StatefulWidget {
  final String driverId;

  DriverEditPage(this.driverId);

  @override
  DriverEditPageState createState() {
    return DriverEditPageState(driverId);
  }
}

class DriverEditPageState extends State<DriverEditPage> {
  final String driverId;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final _emailTextController = TextEditingController();
  final _oldPasswordTextController = TextEditingController();
  final _passwordTextController = TextEditingController();
  final _firstNameTextController = TextEditingController();
  final _lastNameTextController = TextEditingController();

  DriverEditPageState(this.driverId);

  Widget _buildEmailTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Email'),
      keyboardType: TextInputType.emailAddress,
      controller: _emailTextController,
      validator: (String input) {
        if (input.isEmpty || !RegExp(emailRegexp).hasMatch(input)) {
          return 'Please provide a valid email.';
        }
      },
    );
  }

  Widget _buildFirstNameTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'First Name'),
      keyboardType: TextInputType.text,
      controller: _firstNameTextController,
      validator: (String input) {
        if (input.isEmpty) {
          return 'Please provide a valid first name.';
        }
      },
    );
  }

  Widget _buildLastNameTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Last Name'),
      keyboardType: TextInputType.text,
      controller: _lastNameTextController,
      validator: (String input) {
        if (input.isEmpty) {
          return 'Please provide a valid last name.';
        }
      },
    );
  }

  Widget _buildResetPasswordButton() {
    return FlatButton(
      child: Text('Change Password'),
      onPressed: () {},
    );
  }

  Widget _buildSubmitButton() {
    return RaisedButton(
      child: Text('Save'),
      onPressed: _submitForm,
    );
  }

  void _submitForm() {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
      Navigator.pop(context);
    }
  }

  Widget _buildDriverActionItems() {
    return Container();
  }

  Widget _buildDriverInfoForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          _buildEmailTextField(),
          SizedBox(height: 10.0),
          _buildFirstNameTextField(),
          SizedBox(height: 10.0),
          _buildLastNameTextField(),
          SizedBox(height: 10.0),
          _buildResetPasswordButton(),
          SizedBox(height: 10.0),
          _buildSubmitButton(),
          SizedBox(height: 10.0),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Driver'),
      ),
      body: ListView(
        children: <Widget>[
          _buildDriverInfoForm(),
          _buildDriverActionItems(),
        ],
      ),
    );
  }
}
