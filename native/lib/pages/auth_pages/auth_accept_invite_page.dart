import 'package:flutter/material.dart';
import 'package:logisticsinspect/constants/constants.dart';

class AuthAcceptInvitePage extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _emailTextController = TextEditingController();
  final _passwordTextController = TextEditingController();
  final _firstNameTextController = TextEditingController();
  final _lastNameTextController = TextEditingController();

  Widget _buildCompanyInfoTile() {
    return Container(
      child: Text('Company name'),
    );
  }

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

  Widget _buildPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Password'),
      keyboardType: TextInputType.text,
      obscureText: true,
      controller: _passwordTextController,
      validator: (String input) {
        if (input.length < 6) {
          return 'Password should be at least 6 characters.';
        }
      },
    );
  }

  Widget _buildConfirmPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Confirm Password'),
      keyboardType: TextInputType.text,
      obscureText: true,
      validator: (String input) {
        if (_passwordTextController.text != input) {
          return 'Passwords don\'t match.';
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

  Widget _buildSubmitButton() {
    return RaisedButton(
      child: Text('Reset Password'),
      onPressed: _submitForm,
    );
  }

  void _submitForm() {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Accept Invite'),
      ),
      body: Container(
        padding: EdgeInsets.all(32.0),
        child: Center(
          child: Column(
            children: <Widget>[
              _buildCompanyInfoTile(),
              _buildEmailTextField(),
              _buildPasswordTextField(),
              _buildConfirmPasswordTextField(),
              _buildFirstNameTextField(),
              _buildLastNameTextField(),
              _buildSubmitButton(),
            ],
          ),
        ),
      ),
    );
  }
}
